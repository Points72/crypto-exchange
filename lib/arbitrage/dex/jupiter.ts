import { Connection, PublicKey } from '@solana/web3.js';
import { Jupiter } from '@jup-ag/api';

export class JupiterService {
  private connection: Connection;
  private jupiter: Jupiter;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async initialize() {
    this.jupiter = await Jupiter.load({
      connection: this.connection,
      cluster: 'mainnet-beta'
    });
  }

  async getQuote(inputMint: string, outputMint: string, amount: number) {
    if (!this.jupiter) {
      throw new Error('Jupiter not initialized');
    }

    const routes = await this.jupiter.computeRoutes({
      inputMint: new PublicKey(inputMint),
      outputMint: new PublicKey(outputMint),
      amount: amount,
      slippageBps: 50, // 0.5%
    });

    return routes.routesInfos[0];
  }

  async executeSwap(route: any, wallet: any) {
    if (!this.jupiter) {
      throw new Error('Jupiter not initialized');
    }

    const { transactions } = await this.jupiter.exchange({
      route,
      userPublicKey: wallet.publicKey,
    });

    // Sign and execute transaction
    const signedTx = await wallet.signTransaction(transactions.swapTransaction);
    const txid = await this.connection.sendRawTransaction(signedTx.serialize());
    
    return txid;
  }
}