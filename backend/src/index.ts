import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import usersRouter from './routes/users'
import resumesRouter from './routes/resumes'
import viewsRouter from './routes/views'
import paymentsRouter from './routes/payments'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT =4000

app.use(cors())
app.use(express.json({ limit: '5mb' }))


app.use('/users', usersRouter)
app.use('/resumes', resumesRouter)
app.use('/views', viewsRouter)
app.use('/payments', paymentsRouter)


app.get('/check',(req,res)=>res.send('API Running'))
app.listen(PORT, ()=> {
    console.log("server lIstening");
    
})



// Absolutely — **Postman is perfect** for testing this!

// Here’s exactly how you can test your `/resumes` POST endpoint with **raw resume text** as `content`:

// ---

// ### ✅ Step-by-Step: Test Your Resume API in Postman

// #### 1. **Open Postman**

// Create a new **`POST`** request.

// #### 2. **Set the request URL**

// Use the full local backend route, for example:

// ```
// http://localhost:3001/resumes
// ```

// (Adjust the port to match your backend setup.)

// #### 3. **Set Headers**

// Go to the **Headers** tab and add:

// | Key          | Value            |
// | ------------ | ---------------- |
// | Content-Type | application/json |

// #### 4. **Set the Body**

// * Go to the **Body** tab
// * Select **raw**
// * Choose **JSON** from the dropdown on the right
// * Paste in this JSON:

// ```json
// {
//   "userId": "kp_084e8aae65d4491b913c8d0a90348d22",
//   "slug": "sarah-lopez-test",
//   "content": "Hi, my name is Sarah Lopez. I studied marketing at UCLA and graduated in 2020. I worked at a digital agency called BrightSpark from 2020 to 2023 where I was a marketing coordinator. I mainly handled social media campaigns, email newsletters, and worked with clients on branding projects.\n\nNow I’m at a startup called EcoHive as a marketing manager. I lead a small team and we focus on sustainable products. I’ve worked a lot with analytics tools like Google Analytics, HubSpot, and also manage paid ads on Instagram and Google.\n\nI also did a marketing internship at a non-profit during college (2019) and I’m certified in Google Ads and HubSpot Inbound Marketing.\n\nI speak English and Spanish, and I enjoy volunteering at local animal shelters in my free time."
// }
// ```

// #### 5. **Click Send**

// This should hit your backend and trigger the resume-building LLM logic.

// ---

// ### ✅ Expected Result

// * You should receive a **JSON response** from your backend that looks like:

// ```json
// {
//   "id": "...",
//   "userId": "kp_084e8aae65d4491b913c8d0a90348d22",
//   "publicSlug": "sarah-lopez-test",
//   "content": "...",       // The full raw input
//   "html": "<html>..."     // ✔️ Clean HTML resume
// }
// ```

// ---

// ### 🛠 Troubleshooting

// If it returns the original input as `<pre>...</pre>`:

// * Check your backend logs to see the **`llm.data`**
// * If the model returned nothing or a broken response, it might be:

//   * A bad prompt
//   * The LLM not running (Ollama)
//   * Input formatting issues (extra quotes, `\"` etc.)

// ---

// Let me know if you want help testing the resume fetch route (GET `/resumes/:slug`) after that — or rendering it in the frontend!

