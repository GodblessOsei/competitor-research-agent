import { SearchForm } from './components/SearchForm'
import { PipelineStatus } from './components/PipelineStatus'
import { ReportCard } from './components/ReportCard'
import { useResearch } from './hooks/useResearch'

export default function App() {
  const { status, currentStep, data, error, runResearch, PIPELINE_STEPS } = useResearch()

  const loading = status === 'loading'

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Competitor Research Agent</h1>
          <p style={styles.sub}>
            Multi-step AI pipeline which analyses your competitors and delivers
            a structured intelligence report covering pricing, features, positioning, and market threats.
          </p>
        </div>

        <SearchForm onSubmit={runResearch} loading={loading} />

        {loading && (
          <PipelineStatus steps={PIPELINE_STEPS} currentStep={currentStep} />
        )}

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {status === 'success' && (
          <ReportCard data={data} />
        )}
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', padding: '2rem 1rem' },
  container: { maxWidth: 720, margin: '0 auto' },
  header: { marginBottom: '2rem' },
  title: { fontSize: 24, fontWeight: 500, color: '#1a1a1a', marginBottom: 6 },
  sub: { fontSize: 14, color: '#888' },
  error: {
    padding: '12px 16px',
    background: '#fcebeb',
    border: '1px solid #f09595',
    borderRadius: 8,
    fontSize: 13,
    color: '#a32d2d',
    marginBottom: '1rem'
  }
}