"use client"

import { useState } from "react"

export const TransferSection = () => {
  const [history] = useState([
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
  ])

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Send Assets</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Asset</label>
            <select className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1">
              <option>ETH</option>
              <option>USDT</option>
              <option>USDC</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400">Amount</label>
            <input type="number" className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1" placeholder="0.0" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Recipient Address</label>
            <input type="text" className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1" placeholder="0x..." />
          </div>
          <button className="w-full bg-violet-600 py-3 rounded-lg hover:bg-violet-500 transition-colors">Send</button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-medium mb-6">Transfer History</h2>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className={item.type === "Send" ? "text-red-400" : "text-green-400"}>{item.type}</span>
                <span className="text-sm text-gray-400">{item.timestamp}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  Amount: {item.amount} {item.token}
                </p>
                <p className="text-right">
                  {item.type === "Send" ? "To: " : "From: "}
                  <span className="text-gray-400">{item.type === "Send" ? item.to : item.from}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

