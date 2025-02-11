import { Context, ChainId, ChainName, TokenId, CHAIN_ID_SOLANA, CHAIN_ID_ETH } from '@certusone/wormhole-sdk';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { ethers } from 'ethers';

interface TransferParams {
  sourceChain: ChainId | ChainName;
  targetChain: ChainId | ChainName;
  token: TokenId;
  amount: string;
  recipient: string;
  wallet: any; // Ethereum provider или Solana wallet
}

interface TransferStatus {
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
  targetTxHash?: string;
  timestamp: number;
}

export class WormholeService {
  private context: Context;
  private solanaConnection: Connection;
  private ethereumProvider: ethers.providers.Provider;

  constructor(
    solanaRpcUrl: string,
    ethereumRpcUrl: string,
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.context = new Context(network);
    this.solanaConnection = new Connection(solanaRpcUrl);
    this.ethereumProvider = new ethers.providers.JsonRpcProvider(ethereumRpcUrl);
  }

  async bridgeToken(params: TransferParams) {
    try {
      // Проверяем поддерживаемость токена
      const tokenBridge = this.context.getTokenBridge(params.sourceChain);
      const isSupported = await tokenBridge.isTokenSupported(params.token);
      
      if (!isSupported) {
        throw new Error('Token not supported for bridging');
      }

      // Получаем детали токена
      const tokenDetails = await tokenBridge.getTokenDetails(params.token);
      
      // Создаем транзакцию бриджа
      const transferTx = await this.context.createTokenTransfer({
        amount: params.amount,
        tokenAddress: tokenDetails.address,
        tokenChainId: params.sourceChain as number,
        recipientChain: params.targetChain as number,
        recipientAddress: params.recipient,
      });

      // Подписываем и отправляем транзакцию
      let txHash: string;
      
      if (params.sourceChain === CHAIN_ID_SOLANA) {
        // Логика для Solana
        const signedTx = await params.wallet.signTransaction(
          Transaction.from(transferTx.transaction)
        );
        txHash = await this.solanaConnection.sendRawTransaction(
          signedTx.serialize()
        );
      } else if (params.sourceChain === CHAIN_ID_ETH) {
        // Логика для Ethereum
        const signer = this.ethereumProvider.getSigner(params.wallet.address);
        const tx = await signer.sendTransaction(transferTx.transaction);
        txHash = tx.hash;
      } else {
        throw new Error('Unsupported source chain');
      }

      return {
        txHash,
        sequence: transferTx.sequence,
        emitterAddress: transferTx.emitterAddress,
      };
    } catch (error) {
      throw new Error(`Bridge transaction failed: ${error.message}`);
    }
  }

  async getTransferStatus(params: {
    txHash: string;
    sourceChain: ChainId;
    targetChain: ChainId;
  }): Promise<TransferStatus> {
    try {
      // Получаем VAA (Verified Action Approval)
      const vaa = await this.context.getVAA(
        params.txHash,
        params.sourceChain,
        params.targetChain
      );

      if (!vaa) {
        return {
          status: 'pending',
          txHash: params.txHash,
          timestamp: Date.now(),
        };
      }

      // Проверяем статус на целевой сети
      const targetTxHash = await this.context.getTargetTransaction(
        vaa,
        params.targetChain
      );

      return {
        status: targetTxHash ? 'completed' : 'pending',
        txHash: params.txHash,
        targetTxHash,
        timestamp: Date.now(),
      };
    } catch (error) {
      return {
        status: 'failed',
        txHash: params.txHash,
        timestamp: Date.now(),
      };
    }
  }

  async getTokenList(chainId: ChainId): Promise<TokenId[]> {
    try {
      const tokenBridge = this.context.getTokenBridge(chainId);
      const tokens = await tokenBridge.getTokenList();
      return tokens;
    } catch (error) {
      throw new Error(`Failed to get token list: ${error.message}`);
    }
  }

  async estimateFees(params: {
    sourceChain: ChainId;
    targetChain: ChainId;
    token: TokenId;
    amount: string;
  }) {
    try {
      const fees = await this.context.estimateTransferFee({
        sourceChain: params.sourceChain,
        targetChain: params.targetChain,
        token: params.token,
        amount: params.amount,
      });

      return {
        bridgeFee: fees.bridgeFee,
        relayerFee: fees.relayerFee,
        totalFee: fees.totalFee,
      };
    } catch (error) {
      throw new Error(`Failed to estimate fees: ${error.message}`);
    }
  }
}