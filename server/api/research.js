const axios = require('axios')

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

async function callOpenRouter(systemPrompt, userPrompt) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'arcee-ai/trinity-mini:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data.choices[0].message.content
}

async function runResearchAgent(competitor, industry, focuses) {
  const researchResult = await callOpenRouter(
    `You are a competitive intelligence analyst specialising in ${industry}. 
     Be specific and factual. Never make up statistics.`,
    `Research "${competitor}" as a competitor in the ${industry} space. 
     Cover: ${focuses.join(', ')}.
     Write a structured research brief — 3 to 5 paragraphs.`
  )

  const structuredResult = await callOpenRouter(
    `You are a data extraction assistant. 
     You always respond with valid JSON only. 
     No markdown, no backticks, no explanation.`,
    `Based on this research brief, extract structured data:

     ${researchResult}

     Return exactly this JSON shape:
     {
       "company": "string",
       "summary": "2-3 sentence executive summary",
       "pricing": {
         "model": "e.g. freemium / subscription / usage-based",
         "tiers": ["tier 1", "tier 2"],
         "insight": "one strategic observation"
       },
       "topFeatures": ["feature 1", "feature 2", "feature 3"],
       "differentiator": "what genuinely sets them apart",
       "targetSegment": "who they primarily sell to",
       "recentMove": "most notable recent strategic move",
       "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
       "watchNext": "what to monitor in the next 30 days",
       "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
       "threatScores": {
         "marketShare": 0,
         "featureParity": 0,
         "pricingPressure": 0,
         "brandStrength": 0
       }
     }

     All threat scores must be realistic integers between 1 and 100.`
  )

  return { raw: researchResult, structured: structuredResult }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { competitor, industry, focuses } = req.body

  if (!competitor || !industry || !focuses) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await runResearchAgent(competitor, industry, focuses)

    let parsed
    try {
      parsed = JSON.parse(result.structured)
    } catch (e) {
      const jsonMatch = result.structured.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Could not parse structured output as JSON')
      }
    }

    res.status(200).json({ success: true, data: parsed, raw: result.raw })
  } catch (error) {
    console.error('Agent error:', error.message)
    res.status(500).json({ error: 'Agent failed', detail: error.message })
  }
}