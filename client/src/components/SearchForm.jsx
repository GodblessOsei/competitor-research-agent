import { useState } from 'react'

const INDUSTRIES = ['Ecommerce', 'SaaS', 'Fintech', 'Retail', 'Marketing']
const FOCUSES = ['Pricing', 'Features', 'Positioning', 'Partnerships', 'Tech stack']

export function SearchForm({ onSubmit, loading }) {
  const [competitor, setCompetitor] = useState('')
  const [industry, setIndustry] = useState('Ecommerce')
  const [focuses, setFocuses] = useState(['Pricing', 'Features'])

  function toggleFocus(focus) {
    setFocuses(prev =>
      prev.includes(focus)
        ? prev.filter(f => f !== focus)
        : [...prev, focus]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!competitor.trim() || focuses.length === 0) return
    onSubmit(competitor.trim(), industry, focuses)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Competitor name</label>
        <input
          type="text"
          value={competitor}
          onChange={e => setCompetitor(e.target.value)}
          placeholder="e.g. Shopify, Salesforce, Stripe..."
          style={styles.input}
          disabled={loading}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Industry</label>
        <div style={styles.pillRow}>
          {INDUSTRIES.map(ind => (
            <button
              key={ind}
              type="button"
              onClick={() => setIndustry(ind)}
              style={{
                ...styles.pill,
                ...(industry === ind ? styles.pillActive : {})
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Research focus</label>
        <div style={styles.pillRow}>
          {FOCUSES.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => toggleFocus(f)}
              style={{
                ...styles.pill,
                ...(focuses.includes(f) ? styles.pillActive : {})
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !competitor.trim()}
        style={{ ...styles.submitBtn, ...(loading ? styles.submitDisabled : {}) }}
      >
        {loading ? 'Running agent...' : 'Run research agent'}
      </button>
    </form>
  )
}

const styles = {
  form: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: 12,
    padding: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: { fontSize: 13, fontWeight: 500, color: '#444' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    color: '#1a1a1a',
    background: '#fff'
  },
  pillRow: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  pill: {
    padding: '5px 14px',
    borderRadius: 20,
    border: '1px solid #ddd',
    background: '#fff',
    fontSize: 13,
    cursor: 'pointer',
    color: '#555',
    fontFamily: 'inherit',
    transition: 'all 0.15s'
  },
  pillActive: {
    background: '#1a1a1a',
    color: '#fff',
    borderColor: '#1a1a1a'
  },
  submitBtn: {
    padding: '11px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  submitDisabled: { opacity: 0.5, cursor: 'not-allowed' }
}