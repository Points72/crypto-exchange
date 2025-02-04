"use client";

import { useState } from "react";

export const VirtualCardsSection = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      number: "4000 1234 5678 9010",
      expires: "12/25",
      balance: "$1,500",
      status: "Active",
      cvv: "123",
    },
    {
      id: 2,
      number: "4000 9876 5432 1010",
      expires: "08/26",
      balance: "$2,300",
      status: "Frozen",
      cvv: "456",
    },
  ]);

  const generateNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      number: `4000 ${Math.random().toString().slice(2, 6)} ${Math.random().toString().slice(2, 6)} ${Math.random().toString().slice(2, 6)}`,
      expires: `${Math.floor(Math.random() * 12 + 1).toString().padStart(2, "0")}/${Math.floor(Math.random() * 5 + 24)}`,
      balance: "$0",
      status: "Active",
      cvv: Math.floor(Math.random() * 900 + 100).toString(),
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Virtual Cards</h2>
            <button
              onClick={generateNewCard}
              className="bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-500 transition-colors"
            >
              Generate New Card
            </button>
          </div>
          <div className="flex flex-wrap gap-4 overflow-auto max-h-[400px]">
            {cards.map((card) => (
              <div key={card.id} className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 min-w-[280px]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm">Virtual Card</span>
                  <span className={`text-sm px-2 py-1 rounded ${card.status === "Active" ? "bg-green-500" : "bg-gray-500"}`}>
                    {card.status}
                  </span>
                </div>
                <p className="text-2xl mb-4 font-mono">{card.number}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-300">Expires</p>
                    <p>{card.expires}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">CVV</p>
                    <p>{card.cvv}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Balance</p>
                    <p>{card.balance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Card Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Daily Limit</label>
              <input type="number" className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1" placeholder="$1,000" />
            </div>
            <div>
              <label className="text-sm text-gray-400">Security</label>
              <select className="w-full bg-slate-700 rounded-lg px-4 py-2 mt-1 relative z-50">
                <option>3D Secure enabled</option>
                <option>Only physical presence</option>
                <option>All transactions</option>
              </select>
            </div>
            <button className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-500 transition-colors">
              Freeze All Cards
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-500 transition-colors">
              Top Up Balance
            </button>
            <button className="w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-500 transition-colors">
              View Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
