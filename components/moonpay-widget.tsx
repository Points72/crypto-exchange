"use client";

import { useState } from "react";
import { MoonPayProvider, MoonPayBuyWidget } from "@moonpay/moonpay-react";

export const MoonPayWidget = () => {
  const [showWidget, setShowWidget] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_MOONPAY_API_KEY || "";

  if (!apiKey) {
    console.error("❌ NEXT_PUBLIC_MOONPAY_API_KEY is missing!");
    return null;
  }

  return (
    <MoonPayProvider apiKey={apiKey}>
      <button
        onClick={() => setShowWidget(true)}
        className="px-4 py-2 bg-gradient-to-r from-[#7A88FF] to-[#4A90E2] rounded-md font-medium shadow-lg shadow-[#7A88FF]/30 hover:shadow-[#7A88FF]/50 transition-all duration-300"
      >
        Buy Crypto
      </button>
      {showWidget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg overflow-hidden p-6 relative">
            <button
              onClick={() => setShowWidget(false)}
              className="absolute top-2 right-2 text-black"
            >
              ✖
            </button>
            <MoonPayBuyWidget
              variant="embedded"
              baseCurrencyCode="usd"
              baseCurrencyAmount="100"
              defaultCurrencyCode="eth"
              onCloseOverlay={() => setShowWidget(false)}
            />
          </div>
        </div>
      )}
    </MoonPayProvider>
  );
};
