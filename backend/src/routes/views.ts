import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
const router = Router(), prisma = new PrismaClient()

router.post('/', async (req, res) => {
  await prisma.viewLog.create({ data: req.body })
  res.sendStatus(200)
})

export default router