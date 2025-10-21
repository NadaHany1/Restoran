// import React from 'react'

// const Toast = () => {
//   return (
//     <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-white bg-orange-500 rounded-lg shadow-sm absolute top-[10vh] left-1/2 -translate-x-1/2 mx-auto" role="alert">
//         <div className="ms-3 text-sm font-normal">Set yourself free.</div>
//         <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-white p-1.5 hover:bg-orange-600 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-default" aria-label="Close">
//             X
//         </button>
//     </div>
//   )
// }

// export default Toast

"use client"

import React, { useEffect, useState } from 'react'

const Toast = ({ message = "Set yourself free.", duration = 3000 }) => {
  const [visible, setVisible] = useState(true)

  // Auto-hide after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer) // cleanup on unmount
  }, [duration])

  // Hide when user clicks close
  const handleClose = () => setVisible(false)

  if (!visible) return null // don’t render if hidden

  return (
    <div
      id="toast-default"
      className="flex items-center w-full max-w-xs p-4 text-white bg-orange-500 rounded-lg shadow-sm absolute top-[10vh] left-1/2 -translate-x-1/2 shadow-lg transition-opacity duration-300"
      role="alert"
    >
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        onClick={handleClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-white p-1.5 hover:bg-orange-600 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast
