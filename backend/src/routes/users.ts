import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const router = Router(), prisma = new PrismaClient()

router.post('/', async (req, res) => {
  const { id, email, username } = req.body

  try {
    let user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      user = await prisma.user.create({
        data: { id, email, username }
      })
    }

    res.json(user)
  } catch (err: any) {
    console.error("User creation error:", err)
    res.status(500).json({ error: 'User create failed', message: err.message })
  }
})

export default router
