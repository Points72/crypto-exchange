import { PoolSection } from "@/components/pool-section"

export default function PoolPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7A88FF] to-[#4A90E2]">
        Pool
      </h1>
      <PoolSection />
    </div>
  )
}

