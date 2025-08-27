// components/pdf/CVDocument.tsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { CVData } from "@/lib/types";

const themeColors = {
  blue: "#2563eb",
  emerald: "#059669",
  rose: "#e11d48",
};

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 7,
  },
  header: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  contact: {
    fontSize: 9,
    color: "#374151",
    textAlign: "center",
    marginVertical: 6,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: "justify",
  },
  semiBoldText: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: "bold",
    textAlign: "left",
  },
  listItem: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 2,
  },
  grid: {
    flexDirection: "row",
  },
  gridColumn: {
    flex: 1,
    paddingRight: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    marginVertical: 5,
  },
  eduSchool: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  expHeader: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  expCompany: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 11,
  },
  expMeta: {
    fontWeight: "bold",
    fontSize: 11,
  },
});

export default function CVDocument({ data }: { data: CVData }) {
  const themeColor = themeColors[data.theme] || themeColors.blue;

  const contactItems = [
    data.location && data.location,
    data.phone && data.phone,
    data.email && data.email,
    data.linkedin && `LinkedIn: ${data.linkedin.replace(/^https?:\/\//, "")}`,
    data.portfolio && `Portfolio: ${data.portfolio.replace(/^https?:\/\//, "")}`,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* === HEADER === */}
        <View style={styles.section}>
          <Text style={[styles.header, { color: themeColor }]}>{data.name}</Text>
          <Text style={styles.contact}>{contactItems}</Text>
          <View style={styles.separator} />
        </View>

        {/* === SUMMARY === */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
            <View style={styles.separator} />
          </View>
        )}

        {/* === EDUCATION === */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.eduSchool}>
                  {edu.school} — {edu.location} — {edu.date}
                </Text>
                <Text style={styles.semiBoldText}>{edu.degree}</Text>
                <Text style={styles.text}>{edu.details}</Text>
              </View>
            ))}
            <View style={styles.separator} />
          </View>
        )}

        {/* === EXPERIENCE === */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Professional Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.expHeader}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.location ? ` — ${exp.location}` : ""}{" "}
                  {exp.date && <Text style={styles.expMeta}>({exp.date})</Text>}
                </Text>
                <Text style={styles.semiBoldText}>{exp.role}</Text>
                <Text style={styles.text}>{exp.description}</Text>
                {exp.achievements?.filter((a) => a.trim()).length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={[styles.semiBoldText, { color: themeColor }]}>
                      Key Achievements
                    </Text>
                    {exp.achievements.map((ach, j) =>
                      ach.trim() ? (
                        <Text key={j} style={styles.listItem}>
                          • {ach}
                        </Text>
                      ) : null
                    )}
                  </View>
                )}
              </View>
            ))}
            <View style={styles.separator} />
          </View>
        )}

        {/* === SKILLS === */}
        {data.skills.filter((s) => s.trim()).length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Skills</Text>
            <View style={styles.grid}>
              <View style={styles.gridColumn}>
                {data.skills
                  .filter((s) => s.trim())
                  .slice(0, Math.ceil(data.skills.length / 2))
                  .map((skill, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {skill}
                    </Text>
                  ))}
              </View>
              <View style={styles.gridColumn}>
                {data.skills
                  .filter((s) => s.trim())
                  .slice(Math.ceil(data.skills.length / 2))
                  .map((skill, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {skill}
                    </Text>
                  ))}
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        )}

        {/* === CERTIFICATIONS === */}
        {data.certifications.filter((c) => c.trim()).length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Certifications</Text>
            <View style={styles.grid}>
              <View style={styles.gridColumn}>
                {data.certifications
                  .filter((c) => c.trim())
                  .slice(0, Math.ceil(data.certifications.length / 2))
                  .map((cert, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {cert}
                    </Text>
                  ))}
              </View>
              <View style={styles.gridColumn}>
                {data.certifications
                  .filter((c) => c.trim())
                  .slice(Math.ceil(data.certifications.length / 2))
                  .map((cert, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {cert}
                    </Text>
                  ))}
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        )}

        {/* === PROJECTS === */}
        {data.projects.filter((p) => p.trim()).length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.subHeader, { color: themeColor }]}>Projects</Text>
            {data.projects
              .filter((p) => p.trim())
              .map((proj, i) => (
                <Text key={i} style={[styles.listItem, { textAlign: "justify" }]}>
                  • {proj}
                </Text>
              ))}
            <View style={styles.separator} />
          </View>
        )}
      </Page>
    </Document>
  );
}
