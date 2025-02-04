"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

// Функция для генерации случайных данных
const generateData = (count: number) => {
  const data = []
  let price = 1800 // Начальная цена
  for (let i = 0; i < count; i++) {
    price = price + (Math.random() - 0.5) * 20 // Случайное изменение цены
    data.push({
      time: new Date(Date.now() - (count - i) * 60000).toLocaleTimeString(), // Время для каждой точки
      price: Number.parseFloat(price.toFixed(2)),
    })
  }
  return data
}

export function PriceChart() {
  const [data, setData] = useState(generateData(30))

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            price: Number.parseFloat((prevData[prevData.length - 1].price + (Math.random() - 0.5) * 20).toFixed(2)),
          },
        ]
        return newData
      })
    }, 5000) // Обновление каждые 5 секунд

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-48 sm:h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "0.5rem" }} />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

