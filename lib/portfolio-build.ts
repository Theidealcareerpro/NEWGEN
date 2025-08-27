// lib/portfolio-build.ts
import type { PortfolioData } from "./portfolio-types"

export function buildStaticFiles(data: PortfolioData) {
  const theme =
    data.theme === "blue"
      ? "#2563eb"
      : data.theme === "emerald"
      ? "#059669"
      : "#e11d48"

  const safe = (s: string) =>
    s.replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        ch
      ]!
    )
    )
  const nl2br = (s: string) => safe(s).replace(/\n/g, "<br/>")

  // ✅ Profile photo
  const heroPhoto = data.photoDataUrl
    ? `<img src="${data.photoDataUrl}" alt="Profile" class="avatar" />`
    : `<div class="avatar placeholder">👤</div>`

  // ✅ CV button: prefers embedded CV (base64) if available
  const cvButton = data.cvFileDataUrl
    ? `<a href="${data.cvFileDataUrl}" download="${safe(
        data.cvFileName ?? "cv.pdf"
      )}" class="btn btn-primary">Download CV</a>`
    : data.cvUrl
    ? `<a href="${safe(
        data.cvUrl
      )}" target="_blank" class="btn btn-primary">View CV</a>`
    : ""

  const socials = data.socials
    .filter((s) => s.label.trim() && s.url.trim())
    .map(
      (s) =>
        `<a href="${safe(s.url)}" target="_blank" class="chip">${safe(
          s.label
        )}</a>`
    )
    .join("")

  const projects = data.projects
    .filter((p) => p.name.trim())
    .map(
      (p) => `
      <article class="card">
        <div class="card-title">${
          p.link
            ? `<a href="${safe(p.link!)}" target="_blank">${safe(p.name)}</a>`
            : safe(p.name)
        }</div>
        <p>${safe(p.description)}</p>
      </article>
    `
    )
    .join("")

  const skills = data.skills
    .filter((s) => s.trim())
    .map((s) => `<li>${safe(s)}</li>`)
    .join("")

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${safe(data.fullName)} — ${safe(data.role)}</title>
<link rel="stylesheet" href="./styles.css" />
<meta name="description" content="${safe(data.tagline || data.about || "")}" />
</head>
<body>
  <main class="container">
    <header class="hero">
      ${heroPhoto}
      <div class="hero-meta">
        <h1 style="color:${theme}">${safe(data.fullName)}</h1>
        <p class="role">${safe(data.role)}</p>
        <p class="muted">${[data.location, data.email]
          .filter(Boolean)
          .map(safe)
          .join(" • ")}</p>
        <div class="cta">
          ${cvButton}
          ${
            data.linkedin
              ? `<a href="${
                  data.linkedin.startsWith("http")
                    ? data.linkedin
                    : "https://" + data.linkedin
                }" target="_blank" class="btn">LinkedIn</a>` 
              : ""
          }
          ${
            data.email
              ? `<a href="mailto:${safe(data.email)}" class="btn">Email</a>`
              : ""
          }
        </div>
      </div>
    </header>

    ${
      data.about?.trim()
        ? `
    <section>
      <h2 style="color:${theme}">About</h2>
      <p>${nl2br(data.about)}</p>
    </section>`
        : ""
    }

    ${
      skills
        ? `
    <section>
      <h2 style="color:${theme}">Skills</h2>
      <ul class="cols">${skills}</ul>
    </section>`
        : ""
    }

    ${
      projects
        ? `
    <section>
      <h2 style="color:${theme}">Projects</h2>
      <div class="grid">${projects}</div>
    </section>`
        : ""
    }

    ${
      socials
        ? `
    <section>
      <h2 style="color:${theme}">Find me online</h2>
      <div class="chips">${socials}</div>
    </section>`
        : ""
    }

    <footer class="footer muted">
      © ${new Date().getFullYear()} ${safe(data.fullName)} — All rights reserved.
    </footer>
  </main>
</body>
</html>`

  const css = `
:root { --accent: ${theme}; --radius: 14px; font-family: -apple-system, Segoe UI, Roboto, Inter, system-ui, sans-serif; }
*{box-sizing:border-box}
body{margin:0;color:#111827;background:#fff}
.container{max-width:980px;margin:0 auto;padding:2rem}
.hero{display:flex;gap:1rem;align-items:center;margin-bottom:1rem;background:linear-gradient(135deg, rgba(37,99,235,.08), rgba(37,99,235,.01)); padding:1rem; border:1px solid #e5e7eb; border-radius: var(--radius)}
.avatar{height:76px;width:76px;border-radius:9999px;object-fit:cover;border:3px solid #fff;box-shadow:0 1px 2px rgba(0,0,0,.06);background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:24px}
.avatar.placeholder{color:#6b7280}
.hero-meta h1{margin:0;font-size:1.6rem}
.role{margin:.25rem 0;color:#374151}
.muted{color:#6b7280}
.cta{margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem}
.btn{border:1px solid #e5e7eb;border-radius:10px;padding:.45rem .8rem;font-weight:600;font-size:.85rem;color:#111827;text-decoration:none;transition:all .2s}
.btn:hover{background:#f9fafb;transform:translateY(-1px)}
.btn-primary{background:var(--accent);color:#fff;border-color:transparent}
.btn-primary:hover{filter:brightness(.95)}
section{margin-top:1.25rem}
h2{margin:0 0 .5rem 0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:.75rem}
.card{border:1px solid #e5e7eb;border-radius:12px;padding:.7rem;background:#fff;transition:transform .2s}
.card:hover{transform:translateY(-3px)}
.card-title{font-weight:700;margin-bottom:.3rem}
.cols{columns:2;padding-left:1.1rem}
.chips{display:flex;flex-wrap:wrap;gap:.5rem}
.chip{border:1px solid #e5e7eb;border-radius:9999px;padding:.35rem .7rem;font-weight:600;font-size:.8rem;text-decoration:none;color:#111827;transition:all .2s}
.chip:hover{background:#f3f4f6}
.footer{margin-top:2rem;font-size:.85rem;text-align:center}
  `.trim()

  return {
    "index.html": html,
    "styles.css": css,
  }
}
