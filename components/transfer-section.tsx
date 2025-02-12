"use client";

import { useState } from "react";

// Определяем типы для истории транзакций
interface TransferHistory {
  id: number;
  type: "Send" | "Receive";
  token: string;
  amount: string;
  to?: string;
  from?: string;
  status: "Completed" | "Pending";
  timestamp: string;
}

export const TransferSection = () => {
  // Используем типизированный state для истории
  const [history] = useState<TransferHistory[]>([
    {
      id: 1,
      type: "Send",
      token: "ETH",
      amount: "1.5",
      to: "0x1234...5678",
      status: "Completed",
      timestamp: "2024-01-30 14:22",
    },
    {
      id: 2,
      type: "Receive",
      token: "USDT",
      amount: "500",
      from: "0x8765...4321",
      status: "Pending",
      timestamp: "2024-01-30 14:20",
    },
  ]);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Send Assets</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="assetSelect" className="text-sm text-gray-400">
              Asset
            </label>
            <select
              id="assetSelect"
              name="asset"
              className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1"
              aria-label="Select asset to send"
            >
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
          <div>
            <label htmlFor="transferAmount" className="text-sm text-gray-400">
              Amount
            </label>
            <input
              type="number"
              id="transferAmount"
              name="amount"
              className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1"
              placeholder="0.0"
              aria-label="Enter transfer amount"
              min="0"
              step="any"
            />
          </div>
          <div>
            <label htmlFor="recipientAddress" className="text-sm text-gray-400">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipientAddress"
              name="recipient"
              className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1"
              placeholder="0x..."
              aria-label="Enter recipient wallet address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 py-3 rounded-lg hover:bg-violet-500 transition-colors"
            aria-label="Send transaction"
          >
            Send
          </button>
        </form>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Transfer History</h2>
        <div 
          className="space-y-4"
          role="list"
          aria-label="Transaction history"
        >
          {history.map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-700 rounded-lg p-4"
              role="listitem"
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className={item.type === "Send" ? "text-red-400" : "text-green-400"}
                  aria-label={`Transaction type: ${item.type}`}
                >
                  {item.type}
                </span>
                <span 
                  className="text-sm text-gray-400"
                  aria-label="Transaction time"
                >
                  {item.timestamp}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p aria-label="Transaction amount">
                  Amount: {item.amount} {item.token}
                </p>
                <p className="text-right">
                  {item.type === "Send" ? "To: " : "From: "}
                  <span 
                    className="text-gray-400"
                    aria-label={`${item.type === "Send" ? "Recipient" : "Sender"} address`}
                  >
                    {item.type === "Send" ? item.to : item.from}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};