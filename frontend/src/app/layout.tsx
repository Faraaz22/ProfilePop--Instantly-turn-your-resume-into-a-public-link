
import "@/globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "./providers"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata = {
  title: "Drafted",
  description: "Paste your resume, get a polished, shareable page — instantly.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
