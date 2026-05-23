export function PipelineStatus({ steps, currentStep }) {
  return (
    <div style={styles.wrap}>
      {steps.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={step} style={styles.row}>
            <div style={{
              ...styles.dot,
              ...(done ? styles.dotDone : {}),
              ...(active ? styles.dotActive : {})
            }}>
              {done ? '✓' : i + 1}
            </div>
            <span style={{
              ...styles.label,
              ...(active ? styles.labelActive : {}),
              ...(done ? styles.labelDone : {})
            }}>
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  wrap: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: 12,
    padding: '1.25rem 1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  row: { display: 'flex', alignItems: 'center', gap: 10 },
  dot: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: '1.5px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 500,
    color: '#aaa',
    flexShrink: 0
  },
  dotActive: { borderColor: '#1a1a1a', color: '#1a1a1a' },
  dotDone: { background: '#1a1a1a', borderColor: '#1a1a1a', color: '#fff' },
  label: { fontSize: 13, color: '#aaa' },
  labelActive: { color: '#1a1a1a', fontWeight: 500 },
  labelDone: { color: '#888' }
}