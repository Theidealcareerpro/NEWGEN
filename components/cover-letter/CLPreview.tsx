// components/cover-letter/CLPreview.tsx
import { CLDData } from "@/lib/cld-types"
import {
  MapPinIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LinkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline"

type Props = { data: CLDData }

export default function CLPreview({ data }: Props) {
  const themeColor =
    data.theme === "blue"
      ? "text-blue-600"
      : data.theme === "emerald"
      ? "text-emerald-600"
      : "text-rose-600"

  const cleanse = (url: string) => url.replace(/^https?:\/\//, "")

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-lg shadow-md preview text-sm">
      {/* Header */}
      <h1 className={`text-3xl font-bold text-center ${themeColor}`}>{data.applicantName}</h1>
      <hr className="border-t border-gray-300 my-1" />

      {/* Contact */}
      <div className="flex flex-wrap justify-center gap-4 items-center text-gray-700 dark:text-gray-300">
        {data.applicantPortfolio && (
          <a
            href={
              data.applicantPortfolio.startsWith("http")
                ? data.applicantPortfolio
                : `https://${data.applicantPortfolio}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <ClipboardDocumentIcon className="w-4 h-4" />
            {cleanse(data.applicantPortfolio)}
          </a>
        )}
        {data.applicantEmail && (
          <a href={`mailto:${data.applicantEmail}`} className="flex items-center gap-1 hover:underline">
            <EnvelopeIcon className="w-4 h-4" />
            {data.applicantEmail}
          </a>
        )}
        {data.applicantPhone && (
          <a href={`tel:${data.applicantPhone}`} className="flex items-center gap-1 hover:underline">
            <DevicePhoneMobileIcon className="w-4 h-4" />
            {data.applicantPhone}
          </a>
        )}
        {data.applicantLinkedIn && (
          <a
            href={
              data.applicantLinkedIn.startsWith("http")
                ? data.applicantLinkedIn
                : `https://${data.applicantLinkedIn}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <LinkIcon className="w-4 h-4" />
            {cleanse(data.applicantLinkedIn)}
          </a>
        )}
        {data.applicantLocation && (
          <span className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            {data.applicantLocation}
          </span>
        )}
      </div>
      <hr className="border-t border-gray-300 my-1" />

      {/* Date + Recipient */}
      <div className="mb-2">
        {data.date && <p className="text-right">{data.date}</p>}
        {(data.recipientName || data.recipientTitle || data.company || data.companyLocation) && (
          <div className="mt-1">
            {data.recipientName && <p className="font-semibold">{data.recipientName}</p>}
            {data.recipientTitle && <p>{data.recipientTitle}</p>}
            {data.company && <p>{data.company}</p>}
            {data.companyLocation && <p>{data.companyLocation}</p>}
          </div>
        )}
      </div>

      {/* Letter */}
      {data.salutation && <p className="mb-2">{data.salutation}</p>}
      {data.intro && <p className="text-justify mb-2">{data.intro}</p>}

      {data.body.map((p, i) =>
        p.trim() ? (
          <p key={i} className="text-justify mb-2">
            {p}
          </p>
        ) : null
      )}

      {data.closing && <p className="text-justify mb-2">{data.closing}</p>}

      {/* Signature */}
      <div className="mt-4">
        {data.signOff && <p className="mb-1">{data.signOff}</p>}
        <p className="font-semibold">{data.signatureName || data.applicantName}</p>
      </div>
    </div>
  )
}
