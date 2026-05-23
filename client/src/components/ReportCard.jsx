export function ReportCard({ data }) {
  if (!data) return null

  return (
    <div style={styles.card}>

      <div style={styles.header}>
        <div>
          <div style={styles.company}>{data.company}</div>
          <div style={styles.segment}>{data.targetSegment}</div>
        </div>
        <div style={styles.badge}>Report ready</div>
      </div>

      <div style={styles.summary}>{data.summary}</div>

      <div style={styles.body}>

        <div style={styles.grid}>
          <Section title="Pricing">
            <div style={styles.mono}>{data.pricing?.model}</div>
            <div style={styles.tagRow}>
              {data.pricing?.tiers?.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div style={styles.insight}>{data.pricing?.insight}</div>
          </Section>

          <Section title="Top features">
            {data.topFeatures?.map(f => (
              <div key={f} style={styles.listItem}>· {f}</div>
            ))}
          </Section>
        </div>

        <Divider />

        <Section title="Differentiator">
          <div style={styles.highlight}>{data.differentiator}</div>
        </Section>

        <Divider />

        <Section title="Recent move">
          <div style={styles.warn}>{data.recentMove}</div>
        </Section>

        <Divider />

        <Section title="Threat scores">
          {Object.entries(data.threatScores || {}).map(([key, val]) => (
            <ScoreBar key={key} label={key} value={val} />
          ))}
        </Section>

        <Divider />

        <Section title="Our opportunities">
          {data.opportunities?.map((o, i) => (
            <div key={i} style={styles.opp}>↑ {o}</div>
          ))}
        </Section>

        <Divider />

        <Section title="Watch next 30 days">
          <div style={styles.listItem}>{data.watchNext}</div>
        </Section>

        <Divider />

        <Section title="Keywords to monitor">
          <div style={styles.tagRow}>
            {data.keywords?.map(k => <Tag key={k}>{k}</Tag>)}
          </div>
        </Section>

      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: '#f0f0ee', margin: '1.25rem 0' }} />
}

function Section({ title, children }) {
  return (
    <div>
      <div style={{
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: '#999',
        marginBottom: 10
      }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {children}
      </div>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span style={{
      fontSize: 12,
      padding: '3px 10px',
      borderRadius: 4,
      border: '1px solid #e8e8e6',
      color: '#666',
      background: '#f9f9f8'
    }}>
      {children}
    </span>
  )
}

function ScoreBar({ label, value }) {
  const readable = label.replace(/([A-Z])/g, ' $1').toLowerCase()
  const color = value > 70 ? '#e24b4a' : value > 45 ? '#ef9f27' : '#1d9e75'
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
        color: '#666',
        marginBottom: 5
      }}>
        <span>{readable}</span>
        <span>{value}/100</span>
      </div>
      <div style={{ height: 5, background: '#f0f0ee', borderRadius: 3 }}>
        <div style={{
          height: 5,
          width: `${value}%`,
          borderRadius: 3,
          background: color,
          transition: 'width 0.6s ease'
        }} />
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: '2rem'
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #f0f0ee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  company: { fontSize: 20, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 },
  segment: { fontSize: 13, color: '#888' },
  badge: {
    fontSize: 11,
    padding: '4px 12px',
    borderRadius: 20,
    background: '#e1f5ee',
    color: '#0f6e56',
    fontWeight: 500,
    flexShrink: 0
  },
  summary: {
    padding: '1.25rem 1.5rem',
    fontSize: 14,
    color: '#444',
    lineHeight: 1.7,
    borderBottom: '1px solid #f0f0ee'
  },
  body: {
    padding: '1.5rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem'
  },
  mono: { fontSize: 14, fontWeight: 500, color: '#1a1a1a' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 5 },
  insight: { fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 1.5 },
  listItem: { fontSize: 13, color: '#444', lineHeight: 1.6 },
  highlight: {
    fontSize: 13,
    color: '#1a1a1a',
    padding: '10px 14px',
    background: '#f9f9f8',
    borderRadius: 6,
    borderLeft: '3px solid #1a1a1a',
    lineHeight: 1.6
  },
  warn: {
    fontSize: 13,
    color: '#854f0b',
    padding: '10px 14px',
    background: '#faeeda',
    borderRadius: 6,
    lineHeight: 1.6
  },
  opp: { fontSize: 13, color: '#0f6e56', lineHeight: 1.5 }
}