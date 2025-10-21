'use client'
import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown'

const CountDown = () => {
  const [endingDate, setEndingDate] = useState<Date | null>(null)

  useEffect(() => {
    const now = new Date()
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 3, // 3 days later
      0, 0, 0, 0
    )
    setEndingDate(date)
  }, [])

  if (!endingDate) return null // render nothing until mounted

  return <Countdown date={endingDate} className='text-5xl text-orange-200 font-bold'/>
}

export default CountDown
