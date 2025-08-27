// components/preview/CVPreview.tsx
import { CVData } from "@/lib/types"
import {
  MapPinIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LinkIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline"

type Props = {
  data: CVData
}

export default function CVPreview({ data }: Props) {
  const themeColor =
    data.theme === "blue"
      ? "text-blue-600"
      : data.theme === "emerald"
        ? "text-emerald-600"
        : "text-rose-600"

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg text-gray-800 dark:text-gray-200">
      {/* === HEADER === */}
      <h1 className={`text-4xl font-bold text-center ${themeColor}`}>
        {data.name || "Your Name"}
      </h1>

      {/* CONTACT INFO */}
      <div className="flex flex-wrap justify-center gap-4 items-center text-gray-600 dark:text-gray-400 text-sm mt-2">
        {data.portfolio && (
          <a
            href={data.portfolio.startsWith("http") ? data.portfolio : `https://${data.portfolio}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <ClipboardDocumentIcon className="w-4 h-4" />
            {data.portfolio.replace(/^https?:\/\//, "")}
          </a>
        )}
        {data.email && (
          <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:underline">
            <EnvelopeIcon className="w-4 h-4" />
            {data.email}
          </a>
        )}
        {data.phone && (
          <a href={`tel:${data.phone}`} className="flex items-center gap-1 hover:underline">
            <DevicePhoneMobileIcon className="w-4 h-4" />
            {data.phone}
          </a>
        )}
        {data.linkedin && (
          <a
            href={data.linkedin.startsWith("http") ? data.linkedin : `https://${data.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <LinkIcon className="w-4 h-4" />
            {data.linkedin.replace(/^https?:\/\//, "")}
          </a>
        )}
        {data.location && (
          <span className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            {data.location}
          </span>
        )}
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* === SUMMARY === */}
      {data.summary && (
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Summary</h2>
          <p className="text-justify">{data.summary}</p>
        </section>
      )}

      {/* === EDUCATION === */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between text-sm font-medium">
                <span>{edu.school} — {edu.location}</span>
                <span>{edu.date}</span>
              </div>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-justify">{edu.details}</p>
            </div>
          ))}
        </section>
      )}

      {/* === EXPERIENCE === */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Professional Experience</h2>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>{exp.company} — {exp.location}</span>
                <span>{exp.date}</span>
              </div>
              <p className="font-semibold">{exp.role}</p>
              <p className="text-justify">{exp.description}</p>

              {exp.achievements?.filter(a => a.trim()).length > 0 && (
                <div className="mt-2">
                  <h3 className={`text-sm font-semibold ${themeColor}`}>Key Achievements</h3>
                  <ul className="list-disc list-inside text-sm">
                    {exp.achievements.map((ach, i) =>
                      ach.trim() ? <li key={i}>{ach}</li> : null
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* === SKILLS === */}
      {data.skills.filter(s => s.trim()).length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Skills</h2>
          <ul className="grid grid-cols-2 gap-y-1 list-disc list-inside text-sm">
            {data.skills.map((skill, idx) =>
              skill.trim() ? <li key={idx}>{skill}</li> : null
            )}
          </ul>
        </section>
      )}

      {/* === CERTIFICATIONS === */}
      {data.certifications.filter(c => c.trim()).length > 0 && (
        <section className="mb-6">
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Certifications</h2>
          <ul className="grid grid-cols-2 gap-y-1 list-disc list-inside text-sm">
            {data.certifications.map((cert, idx) =>
              cert.trim() ? <li key={idx}>{cert}</li> : null
            )}
          </ul>
        </section>
      )}

      {/* === PROJECTS === */}
      {data.projects.filter(p => p.trim()).length > 0 && (
        <section>
          <h2 className={`text-xl font-semibold ${themeColor} mb-2`}>Projects</h2>
          <ul className="list-disc list-inside text-sm">
            {data.projects.map((proj, idx) =>
              proj.trim() ? <li key={idx} className="text-justify">{proj}</li> : null
            )}
          </ul>
        </section>
      )}
    </div>
  )
}
