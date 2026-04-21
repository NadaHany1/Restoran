"use client"

import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

const Toast = ({ message, duration = 5000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true)

  // Auto-hide after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose();
    }, duration)

    return () => clearTimeout(timer) // cleanup on unmount
  }, [duration,onClose])

  // Hide when user clicks close
  const handleClose = () => {
    setVisible(false)
    onClose();
  }

  if (!visible) return null // don’t render if hidden

  return (
    <div
      id="toast-default"
      className="flex items-center w-[80vw] max-w-xs p-4 text-white bg-orange-500/80 rounded-lg fixed top-[10vh] left-1/2 -translate-x-1/2 shadow-lg z-20 transition-opacity duration-700"
      role="alert"
    >
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        onClick={handleClose}
        className="ms-auto -mx-1.5 -my-1.5 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-white p-1.5 hover:bg-orange-600 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <X/>
      </button>
    </div>
  )
}

export default Toast
