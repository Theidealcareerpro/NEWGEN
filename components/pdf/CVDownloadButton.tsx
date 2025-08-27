// components/pdf/CVDownloadButton.tsx
"use client"

import { BlobProvider } from "@react-pdf/renderer"
import { Loader2 } from "lucide-react"
import CVDocument from "./CVDocument"
import { CVData } from "@/lib/types"

export default function CVDownloadButton({ data }: { data: CVData }) {
  return (
    <BlobProvider document={<CVDocument data={data} />}>
      {({ url, loading, error }) => {
        const disabled = loading || !url || !!error
        return (
          <a
            href={disabled ? undefined : url}
            download="cv.pdf"
            onClick={(e) => {
              if (disabled) e.preventDefault()
            }}
            className={[
              "block w-full text-center font-medium py-2 rounded transition",
              disabled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white",
            ].join(" ")}
            aria-disabled={disabled}
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating PDF…
              </span>
            ) : error ? (
              "Could not generate PDF"
            ) : (
              "Download PDF"
            )}
          </a>
        )
      }}
    </BlobProvider>
  )
}
