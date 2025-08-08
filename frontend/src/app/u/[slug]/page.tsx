
import DowloadButton from "@/components/DowloadButton"
import { notFound } from "next/navigation"
export const dynamic = 'force-dynamic';

export default async function PublicResumePage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resumes/${params.slug}`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) return notFound()
  const data = await res.json()

  console.log("Slug param is:", params.slug)


  return (
    <>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{params.slug}'s Resume</h1>
        <div className="resume-output" dangerouslySetInnerHTML={{ __html: data.html }} />
        <DowloadButton />
      </main>

      {/* Your styles here */}
    </>
  )
}
