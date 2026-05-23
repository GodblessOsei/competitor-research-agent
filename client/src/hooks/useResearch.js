import { useState } from 'react'
import axios from 'axios'

const PIPELINE_STEPS = [
  'Sending research brief',
  'Analysing competitor',
  'Extracting intel',
  'Structuring report',
  'Done'
]

export function useResearch() {
  const [status, setStatus] = useState('idle')
  const [currentStep, setCurrentStep] = useState(-1)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:3001'

  async function runResearch(competitor, industry, focuses) {
    setStatus('loading')
    setError(null)
    setData(null)

    // Simulate pipeline steps while waiting for the real response
    let step = 0
    setCurrentStep(0)
    const interval = setInterval(() => {
      step += 1
      if (step < PIPELINE_STEPS.length - 1) {
        setCurrentStep(step)
      }
    }, 2200)

    try {

      const response = await axios.post(`${BASE_URL}/api/research`, {
        competitor,
        industry,
        focuses
      })

      clearInterval(interval)
      setCurrentStep(PIPELINE_STEPS.length - 1)
      setData(response.data.data)
      setStatus('success')
    } catch (err) {
      clearInterval(interval)
      setError(err.response?.data?.error || 'Something went wrong')
      setStatus('error')
      setCurrentStep(-1)
    }
  }

  return { status, currentStep, data, error, runResearch, PIPELINE_STEPS }
}