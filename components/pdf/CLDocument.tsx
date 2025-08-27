// components/pdf/CLDocument.tsx
import * as React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { CLDData } from "@/lib/cld-types"

const themeColors: Record<CLDData["theme"], string> = {
  blue: "#2563eb",
  emerald: "#059669",
  rose: "#e11d48",
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    color: "#1a1a1a",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    textAlign: "center",
    marginVertical: 4,
    color: "#374151",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    marginVertical: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: "justify",
  },
  strong: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: 700,
  },
})

export default function CLDocument({ data }: { data: CLDData }) {
  const themeColor = themeColors[data.theme]

  const contactItems = [
    data.applicantLocation && data.applicantLocation,
    data.applicantPhone && data.applicantPhone,
    data.applicantEmail && data.applicantEmail,
    data.applicantLinkedIn && `LinkedIn: ${data.applicantLinkedIn.replace(/^https?:\/\//, "")}`,
    data.applicantPortfolio && `Portfolio: ${data.applicantPortfolio.replace(/^https?:\/\//, "")}`,
  ]
    .filter(Boolean)
    .join(" | ")

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={[styles.header, { color: themeColor }]}>{data.applicantName}</Text>
        <View style={styles.separator} />
        {contactItems ? <Text style={styles.contact}>{contactItems}</Text> : null}
        <View style={styles.separator} />

        {/* Date / Recipient */}
        {data.date ? <Text style={{ fontSize: 10, textAlign: "right", marginBottom: 4 }}>{data.date}</Text> : null}
        {(data.recipientName || data.recipientTitle || data.company || data.companyLocation) ? (
          <View style={{ marginBottom: 6 }}>
            {data.recipientName ? <Text style={styles.strong}>{data.recipientName}</Text> : null}
            {data.recipientTitle ? <Text style={{ fontSize: 10 }}>{data.recipientTitle}</Text> : null}
            {data.company ? <Text style={{ fontSize: 10 }}>{data.company}</Text> : null}
            {data.companyLocation ? <Text style={{ fontSize: 10 }}>{data.companyLocation}</Text> : null}
          </View>
        ) : null}

        {/* Letter */}
        {data.salutation ? <Text style={{ fontSize: 10, marginBottom: 4 }}>{data.salutation}</Text> : null}
        {data.intro ? <Text style={styles.text}>{data.intro}</Text> : null}
        {data.body.map((p, i) => (p.trim() ? <Text key={i} style={styles.text}>{p}</Text> : null))}
        {data.closing ? <Text style={styles.text}>{data.closing}</Text> : null}

        {/* Signature */}
        <View style={{ marginTop: 8 }}>
          {data.signOff ? <Text style={{ fontSize: 10, marginBottom: 2 }}>{data.signOff}</Text> : null}
          <Text style={styles.strong}>{data.signatureName || data.applicantName}</Text>
        </View>
      </Page>
    </Document>
  )
}
