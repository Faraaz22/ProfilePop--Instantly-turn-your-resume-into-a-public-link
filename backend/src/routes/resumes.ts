// backend/src/routes/resumes.ts
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const router = Router()
const prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { userId, content, slug } = req.body
  console.log('Incoming data:', { userId, content: JSON.stringify(content).slice(0, 100), slug })

  try {
    const parsed = JSON.parse(content)
    const rawText = parsed.text

    // Call Ollama locally
    const llm = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2',
      // prompt: `Format this resume as clean, structured HTML resume:\n\n${rawText}`
      prompt: `You are a professional resume writer and HTML designer. Given this plain resume text, convert it to beautiful, well-structured HTML using semantic tags (like <section>, <h2>, <ul>, etc.), proper indentation, consistent spacing, and clear section titles (like Skills, Projects, Education). Use Tailwind-compatible classes when helpful. Maxke sure it dosen't go outside the page dimensions. Alos hignlight the heading with <strong>. Make it such that it is clear to read when printed as pdf Resume:\n\n${rawText}`

    })
    let html = llm.data.choices?.[0]?.text
    if (!html) html = `<pre>${rawText}</pre>`

    const resume = await prisma.resume.upsert({
      where: { userId },
      update: { content: parsed, html, publicSlug: slug },
      create: { userId, content: parsed, html, publicSlug: slug }
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
