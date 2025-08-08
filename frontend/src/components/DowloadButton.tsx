"use client"
import React from 'react'

const DowloadButton = () => {
   const handleDownload = () => {
    window.print()
    console.log("Download clicked")
    
  }
  return (
    <div><button onClick={handleDownload} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Download PDF
      </button></div>
  )
}

export default DowloadButton