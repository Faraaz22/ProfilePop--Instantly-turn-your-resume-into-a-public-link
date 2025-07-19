import React from 'react'

const DowloadButton = () => {
  return (
    <div><button onClick={() => window.print()} className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Download PDF
      </button></div>
  )
}

export default DowloadButton