"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { PublicKey, Transaction, Connection, SystemProgram } from "@solana/web3.js";
import { ArrowDownUp } from "lucide-react";
import { COMMON_TOKENS, TokenInfo } from "@/lib/tokens";

const EVM_WALLET = "0x6d72111eD683a3235aDe54cD08f571145f5b06D0";
const SOLANA_WALLET = "A8YVEaSkAzJZLbiNnZwK45vHRRWSJ59pK2H5MsajLgL5";

export function Swap() {
  const [fromToken, setFromToken] = useState<TokenInfo>(COMMON_TOKENS[0]);
  const [toToken, setToToken] = useState<TokenInfo>(COMMON_TOKENS[1]);
  const [amount, setAmount] = useState("");

  const handleSwap = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Введите сумму");
      return;
    }

    try {
      if (fromToken.chain === "solana") {
        await swapOnSolana(fromToken, toToken, amount);
      } else {
        await swapOnEVM(fromToken, toToken, amount);
      }
    } catch (error) {
      console.error("Ошибка свопа:", error);
      alert("Произошла ошибка во время свопа");
    }
  };

  // 🔥 Swap через 1inch (Ethereum, BSC, Polygon)
  const swapOnEVM = async (fromToken: TokenInfo, toToken: TokenInfo, amount: string) => {
    if (!(window as any).ethereum) {
      alert("Установите MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const feeAmount = (Number(amount) * 0.02).toFixed(6);
    const swapAmount = (Number(amount) * 0.98).toFixed(6);

    const quoteUrl = `https://api.1inch.io/v5.0/${fromToken.chain}/quote?fromTokenAddress=${fromToken.address}&toTokenAddress=${toToken.address}&amount=${ethers.parseUnits(swapAmount, fromToken.decimals)}`;

    const response = await fetch(quoteUrl);
    const quoteData = await response.json();

    if (!quoteData.toTokenAmount) {
      alert("Ошибка получения курса");
      return;
    }

    const swapUrl = `https://api.1inch.io/v5.0/${fromToken.chain}/swap?fromTokenAddress=${fromToken.address}&toTokenAddress=${toToken.address}&amount=${ethers.parseUnits(swapAmount, fromToken.decimals)}&fromAddress=${userAddress}&slippage=1`;

    const swapResponse = await fetch(swapUrl);
    const swapData = await swapResponse.json();

    if (!swapData.tx) {
      alert("Ошибка получения swap-транзакции");
      return;
    }

    const tx = await signer.sendTransaction({
      to: swapData.tx.to,
      data: swapData.tx.data,
      value: swapData.tx.value,
    });

    await tx.wait();

    // 🔥 Отправляем 2% комиссии
    await signer.sendTransaction({
      to: EVM_WALLET,
      value: ethers.parseUnits(feeAmount, fromToken.decimals),
    });

    alert("Swap выполнен!");
  };

  // 🔥 Swap через Jupiter (Solana)
  const swapOnSolana = async (fromToken: TokenInfo, toToken: TokenInfo, amount: string) => {
    if (!(window as any).solana) {
      alert("Установите Phantom Wallet");
      return;
    }

    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const wallet = (window as any).solana;
    await wallet.connect();

    const userPublicKey = new PublicKey(wallet.publicKey.toString());

    const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${Math.floor(Number(amount) * 10 ** fromToken.decimals)}`;
    const response = await fetch(quoteUrl);
    const quoteData = await response.json();

    if (!quoteData.outAmount) {
      alert("Ошибка получения курса");
      return;
    }

    const swapUrl = "https://quote-api.jup.ag/v6/swap";
    const swapResponse = await fetch(swapUrl, {
      method: "POST",
      body: JSON.stringify({
        userPublicKey: userPublicKey.toString(),
        inputMint: fromToken.address,
        outputMint: toToken.address,
        amount: Math.floor(Number(amount) * 10 ** fromToken.decimals),
        slippageBps: 50,
      }),
    });

    const swapData = await swapResponse.json();
    if (!swapData.transaction) {
      alert("Ошибка получения swap-транзакции");
      return;
    }

    const transaction = Transaction.from(Buffer.from(swapData.transaction, "base64"));
    transaction.feePayer = userPublicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signedTransaction = await wallet.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTransaction.serialize());

    alert(`Swap выполнен! Транзакция: https://explorer.solana.com/tx/${txId}`);

    // 🔥 Отправляем 2% комиссии
    const feeAmount = (Number(amount) * 0.02).toFixed(6);
    const feeTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userPublicKey,
        toPubkey: new PublicKey(SOLANA_WALLET),
        lamports: Math.floor(Number(feeAmount) * 10 ** fromToken.decimals),
      })
    );

    const signedFeeTransaction = await wallet.signTransaction(feeTransaction);
    await connection.sendRawTransaction(signedFeeTransaction.serialize());
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/quantum-grid.svg')] opacity-5 animate-pulse-slow"></div>
      <div className="relative p-6 rounded-xl bg-[#0A0B1E]/90 border border-[#4A90E2]/20">
        <h2 className="text-2xl font-bold mb-4 text-[#7A88FF]">Quantum Swap</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Введите сумму"
            className="bg-[#1A1B3E] p-4 rounded-xl text-white"
          />
          <button onClick={handleSwap} className="p-4 rounded-xl bg-[#4A90E2] text-white">
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
