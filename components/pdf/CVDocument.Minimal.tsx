// components/pdf/CVDocument.Minimal.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { CVData } from "@/lib/types"

const themeColors = {
  blue: "#111827",      // minimal = neutral headings
  emerald: "#064e3b",
  rose: "#881337",
}

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: "#111827",
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: "left",
  },
  contact: {
    fontSize: 9,
    color: "#4b5563",
    marginTop: 2,
    marginBottom: 6,
  },
  hr: {
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    marginVertical: 8,
  },
  section: { marginTop: 6 },
  title: { fontSize: 11, fontWeight: 700, marginBottom: 3 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  strong: { fontWeight: 700 },
  p: { fontSize: 10.5, lineHeight: 1.45, textAlign: "justify" },
  bullet: { marginLeft: 10, marginBottom: 1.5 },
  grid: { flexDirection: "row" },
  col: { flex: 1, paddingRight: 8 },
})

export default function CVDocumentMinimal({ data }: { data: CVData }) {
  const color = themeColors[data.theme] || themeColors.blue
  const contact = [
    data.email,
    data.phone,
    data.location,
    data.linkedin && data.linkedin.replace(/^https?:\/\//, ""),
    data.portfolio && data.portfolio.replace(/^https?:\/\//, ""),
  ].filter(Boolean).join(" • ")

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.name, { color }]}>{data.name}</Text>
        {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        <View style={styles.hr} />

        {/* Summary */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Summary</Text>
            <Text style={styles.p}>{data.summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {data.experience.length ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Experience</Text>
            {data.experience.map((x, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
                <View style={styles.row}>
                  <Text style={styles.strong}>{x.role}</Text>
                  <Text>{x.date}</Text>
                </View>
                <Text style={{ marginBottom: 1 }}>{x.company} — {x.location}</Text>
                {x.description ? <Text style={styles.p}>{x.description}</Text> : null}
                {x.achievements?.filter((a) => a.trim()).length ? (
                  <View style={{ marginTop: 2 }}>
                    {x.achievements.map((a, j) =>
                      a.trim() ? (
                        <Text key={j} style={styles.bullet}>
                          • {a}
                        </Text>
                      ) : null
                    )}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {data.education.length ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Education</Text>
            {data.education.map((e, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.row}>
                  <Text style={styles.strong}>{e.school}</Text>
                  <Text>{e.date}</Text>
                </View>
                <Text style={{ marginBottom: 1 }}>{e.degree}</Text>
                <Text style={{ color: "#4b5563" }}>{e.location}</Text>
                {e.details ? <Text style={styles.p}>{e.details}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {data.skills.filter((s) => s.trim()).length ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Skills</Text>
            <View style={styles.grid}>
              <View style={styles.col}>
                {data.skills.filter((s) => s.trim()).slice(0, Math.ceil(data.skills.length / 2)).map((s, i) => (
                  <Text key={i} style={styles.bullet}>• {s}</Text>
                ))}
              </View>
              <View style={styles.col}>
                {data.skills.filter((s) => s.trim()).slice(Math.ceil(data.skills.length / 2)).map((s, i) => (
                  <Text key={i} style={styles.bullet}>• {s}</Text>
                ))}
              </View>
            </View>
          </View>
        ) : null}

        {/* Certifications */}
        {data.certifications.filter((c) => c.trim()).length ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Certifications</Text>
            {data.certifications.filter((c) => c.trim()).map((c, i) => (
              <Text key={i} style={styles.bullet}>• {c}</Text>
            ))}
          </View>
        ) : null}

        {/* Projects */}
        {data.projects.filter((p) => p.trim()).length ? (
          <View style={styles.section}>
            <Text style={[styles.title, { color }]}>Projects</Text>
            {data.projects.filter((p) => p.trim()).map((p, i) => (
              <Text key={i} style={[styles.bullet, { textAlign: "justify" }]}>• {p}</Text>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  )
}
