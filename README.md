# Competitor Research Agent

A multi-step agentic AI pipeline that researches any competitor and generates a structured intelligence report. Built as a demonstration of AI workflow automation for ecommerce and SaaS businesses.

**Live demo:** https://competitor-research-agent-mu.vercel.app

## What it does

1. Takes a competitor name, industry, and research focus areas as input
2. Sends a research brief to an LLM to generate a structured analysis
3. Passes that output to a second LLM call to extract clean JSON
4. Returns a formatted intelligence report covering pricing, features, positioning, threat scores, and opportunities

## Tech stack

- **Frontend:** React + Vite, deployed on Vercel
- **Backend:** Node.js serverless function (Vercel)
- **AI:** OpenRouter API with `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning`
- **Pattern:** Multi-step agentic pipeline with model fallback on rate limits

## Project structure

```text
competitor-research-agent/
├── api/
│   └── research.js        # Serverless function — agent logic
├── client/
│   └── src/
│       ├── components/    # SearchForm, ReportCard, PipelineStatus
│       ├── hooks/         # useResearch — data fetching logic
│       └── App.jsx
├── vercel.json            # Routing config
└── package.json
```
## Model selection

The pipeline uses `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning` via OpenRouter. This model 
was selected after testing several alternatives for its consistency in following structured 
output instructions across both the research and extraction steps. In a production deployment, 
the model can be swapped to any OpenAI-compatible endpoint i.e. GPT-4o, Claude, or a fine-tuned 
internal model, without changing the pipeline logic, since all model calls are abstracted 
through a single `callOpenRouter` function.

## Running locally

1. Clone the repo
2. Add your OpenRouter API key to `server/.env`:
```
OPENROUTER_API_KEY=your_key_here
```
3. Start the backend:
```bash
   cd server && node index.js
```
4. Start the frontend:
```bash
   cd client && npm run dev
```
5. Visit `http://localhost:5173`

## Reason behind architecture

The main goal was to have separation of concern. The two-step pipeline pattern separates the research step from the extraction step to produce a more reliable structured output than asking a single prompt to do both. Each LLM call has a focused system prompt (analyst for step one, data extractor for step two) which keeps outputs consistent and easier to validate.