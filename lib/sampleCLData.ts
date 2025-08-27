// lib/sampleCLData.ts
import { CLDData } from "./cld-types"

export const sampleCL: CLDData = {
  // Applicant
  applicantName: "Doe Peter Mark",
  applicantEmail: "Doepetermark@gmail.com",
  applicantPhone: "07818188608",
  applicantLinkedIn: "https://www.linkedin.com/in/Doepetermark",
  applicantPortfolio: "https://Doepetermark.dev",
  applicantLocation: "London, United Kingdom",

  // Recipient / Company
  recipientName: "Hiring Manager",
  recipientTitle: "Talent Acquisition Lead",
  company: "CW Real Estate Limited",
  companyLocation: "London, United Kingdom",

  // Role & meta
  roleTitle: "Business / Data Analyst",
  date: "13 August 2025",
  salutation: "Dear Hiring Manager,",

  // Content
  intro:
    "I’m excited to apply for the Business / Data Analyst role at CW Real Estate Limited. With hands-on experience partnering with cross-functional teams and building data-informed reporting, I help stakeholders move faster and make better decisions.",
  body: [
    "In my most recent role, I collaborated with commercial and operations teams to design lightweight dashboards and self-serve metrics. I translated ambiguous requirements into clear problem statements, then iterated quickly with stakeholders to align on the ‘why’, the metrics that matter, and the simplest solution that delivered value.",
    "I’m comfortable working across the data lifecycle — from cleaning and modeling through to insight storytelling. I emphasize clarity: clean definitions, reproducible analyses, and documentation that others can pick up. I also enjoy partnering with engineering to productionize what works, while staying pragmatic and business-focused.",
    "I’m particularly drawn to CW Real Estate’s customer-first mindset and the opportunity to support teams with actionable analytics that improve outcomes. I thrive in environments that value ownership, high standards, and thoughtful collaboration."
  ],
  closing:
    "I’d welcome the chance to discuss how I can contribute to CW Real Estate’s goals. Thank you for your time and consideration.",

  // Sign-off
  signOff: "Sincerely,",
  signatureName: "Doe Peter Mark",

  // Presentation
  theme: "blue",
  font: "inter",
}
