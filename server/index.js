const express = require('express')
const cors = require('cors') // non-blocking communication btwn frontend and backend
require('dotenv').config()

const researchRouter = require('./api/research')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json()) // read incoming json request

app.use('/api/research', researchRouter)

app.get('/health', (req, res) => { 
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})