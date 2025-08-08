// backend/src/routes/resumes.ts
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const router = Router()
const prisma = new PrismaClient()

const prompt = `
You are a professional resume builder.

Your task is to read the following **unstructured, paragraph-style** input and extract key details to format a clean, structured **HTML resume**.

Please do the following:
1. Extract and highlight the candidate's **name and contact information** at the top.
2. Write a short **summary/objective** based on the text.
3. Organize all listed **skills** into a bulleted list.
4. Structure **work experience** into: job title, company, location, dates, and bullet points of responsibilities.
5. Extract **education** and format clearly.
6. Include **projects, open source contributions, or extra info** if mentioned.
7. Output the final result as **clean semantic HTML**. Do NOT include any styling or inline CSS. Only HTML structure.

Input:
"""
`;


// router.post('/', async (req, res) => {
//   const { userId, content, slug } = req.body
//   console.log('Incoming data:', { userId, content: JSON.stringify(content).slice(0, 100), slug })

//   try {
//     const parsed = JSON.parse(content)
//     const rawText = parsed.text

//     // Call Ollama locally
//     const llm = await axios.post('http://localhost:11434/api/generate', {
//       model: 'mistral:7b',
//       // prompt: `Format this resume as clean, structured HTML resume:\n\n${rawText}`
//       // prompt: `${prompt} + ${rawText}`
//       prompt: `${prompt}${rawText}\n"""\n\nNow generate the HTML resume and add whatever details needed:\n\n`

//     })
//     let html = llm.data.choices?.[0]?.text
//     if (!html) html = `<pre>${rawText}</pre>`

//     const resume = await prisma.resume.upsert({
//       where: { userId },
//       update: { content: parsed, html, publicSlug: slug },
//       create: { userId, content: parsed, html, publicSlug: slug }
//     })

//     res.json(resume)
//   } catch (err: any) {
//     console.error('Resume save failed!', err)
//     res.status(500).json({ error: 'Resume save failed', message: err.message })
//   }
// })

// In your route:
router.post('/', async (req, res) => {
  const { userId, content, slug } = req.body
  console.log('Full req.body:', JSON.stringify(req.body).slice(0, 2000))

  try {
    // Assuming content is object not string
    // If still string, try JSON.parse but better fix client first
    const rawText = typeof content === 'string' ? JSON.parse(content).text : content.text

    const llm = await axios.post('http://localhost:11434/api/generate', {
  model: 'mistral:7b',
  prompt: `${prompt}${rawText}\n"""\n\nNow generate the HTML resume and add whatever details needed:\n\n`
})

// Log full response
console.log('LLM Full Response:', JSON.stringify(llm.data, null, 2))

// Use the correct field based on Ollama response format
let html = llm.data.response || llm.data.choices?.[0]?.text || `<pre>${rawText}</pre>`

if (!html || !html.includes("<")) {
  console.warn("Fallback to rawText. LLM response:", html)
  html = `<pre>${rawText}</pre>`
}

    const resume = await prisma.resume.upsert({
      where: { userId },
      update: { content, html, publicSlug: slug },
      create: { userId, content, html, publicSlug: slug }
    })

    res.json(resume)
  } catch (err: any) {
    console.error('Resume save failed!', err)
    res.status(500).json({ error: 'Resume save failed', message: err.message })
  }
})

router.get('/:slug', async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { publicSlug: req.params.slug } })
  if (!resume) return res.status(404).json({ error: 'Not found' })
  res.json(resume)
})

router.get('/by-user/:userId', async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { userId: req.params.userId } })
  res.json(resume || null)
})

export default router
