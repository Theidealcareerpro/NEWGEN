import LegalLayout from "@/components/Layout/LegalLayout"

export default function Page() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>We don’t store your CV/Cover Letter content. Portfolios deploy to GitHub under your org; metadata only (fingerprint, repo name, expiry) is kept in Supabase to enforce limits.</p>
      <p>Contact: hello@your-domain.com</p>
    </LegalLayout>
  )
}
