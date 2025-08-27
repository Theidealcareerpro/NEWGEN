// components/pdf/CLDownloadWrapper.tsx
"use client"

import dynamic from "next/dynamic"
import { CLDData } from "@/lib/cld-types"

const CLDownloadButton = dynamic(() => import("./CLDownloadButton"), {
  ssr: false,
  loading: () => (
    <div className="block w-full text-center bg-gray-300 text-gray-700 py-2 rounded">
      Loading…
    </div>
  ),
})

export default function CLDownloadWrapper({ data }: { data: CLDData }) {
  return <CLDownloadButton data={data} />
}
