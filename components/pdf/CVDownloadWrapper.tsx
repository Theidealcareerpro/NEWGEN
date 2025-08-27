// components/pdf/CVDownloadWrapper.tsx
"use client"

import dynamic from "next/dynamic"
import { CVData } from "@/lib/types"

const CVDownloadButton = dynamic(() => import("./CVDownloadButton"), {
  ssr: false,
  loading: () => (
    <div className="block w-full text-center bg-gray-300 text-gray-700 py-2 rounded">
      Loading…
    </div>
  ),
})

export default function CVDownloadWrapper({ data }: { data: CVData }) {
  return <CVDownloadButton data={data} />
}
