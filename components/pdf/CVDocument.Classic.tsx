// components/pdf/CVDocument.Classic.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { CVData } from "@/lib/types"

const themeColors = {
  blue: "#2563eb",
  emerald: "#059669",
  rose: "#e11d48",
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 28,
    fontSize: 11,
    fontFamily: "Times-Roman",
    lineHeight: 1.4,
    color: "#111827",
  },
  headerName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerRole: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
  },
  contact: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 6,
    color: "#374151",
  },
  rule: {
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    marginVertical: 8,
  },
  section: { marginTop: 8, marginBottom: 6 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  eduLine: { fontSize: 11, fontWeight: "bold" },
  meta: { fontSize: 9, color: "#374151", marginBottom: 2 },
  text: { fontSize: 10, textAlign: "justify" },
  bullet: { fontSize: 10, marginLeft: 10, marginBottom: 1.5 },
  expHeader: { fontSize: 11, fontWeight: "bold", marginBottom: 1 },
  expMeta: { fontSize: 9, color: "#374151", marginBottom: 2 },
  twoCol: { flexDirection: "row" },
  col: { flex: 1, paddingRight: 8 },
})

export default function CVDocumentClassic({ data }: { data: CVData }) {
  const color = themeColors[data.theme] || themeColors.blue
  const contact = [
    data.location && data.location,
    data.phone && data.phone,
    data.email && data.email,
    data.linkedin && data.linkedin.replace(/^https?:\/\//, ""),
    data.portfolio && data.portfolio.replace(/^https?:\/\//, ""),
  ]
    .filter(Boolean)
    .join(" | ")

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.headerName, { color }]}>{data.name}</Text>
        {data.summary ? <Text style={[styles.headerRole]}>{data.summary.slice(0, 80)}</Text> : null}
        {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        <View style={styles.rule} />

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color }]}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color }]}>Education</Text>
            {data.education.map((e, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={styles.eduLine}>
                  {e.school} — {e.degree}
                </Text>
                <Text style={styles.meta}>
                  {e.location} • {e.date}
                </Text>
                {e.details ? <Text style={styles.text}>{e.details}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color }]}>Professional Experience</Text>
            {data.experience.map((x, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.expHeader}>{x.role} — {x.company}</Text>
                <Text style={styles.expMeta}>
                  {x.location} • {x.date}
                </Text>
                {x.description ? <Text style={styles.text}>{x.description}</Text> : null}
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
        )}

        {/* Skills & Certifications */}
        {(data.skills.filter(Boolean).length || data.certifications.filter(Boolean).length) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color }]}>Skills & Certifications</Text>
            <View style={styles.twoCol}>
              <View style={styles.col}>
                {data.skills.filter((s) => s.trim()).map((s, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {s}
                  </Text>
                ))}
              </View>
              <View style={styles.col}>
                {data.certifications.filter((s) => s.trim()).map((s, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {s}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects.filter(Boolean).length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color }]}>Projects</Text>
            {data.projects.filter((p) => p.trim()).map((p, i) => (
              <Text key={i} style={styles.bullet}>
                • {p}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
