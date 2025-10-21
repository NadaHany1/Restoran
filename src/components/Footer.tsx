import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='h-[10vh] text-orange-500 flex items-center justify-between border-orange-500 border-t-[2px] p-6 md:px-12 lg:px-20 xl:px-40'>
      <Link href={'#'} className='font-bold text-xl'>RESTORAN</Link>
      <p>all rights reserved </p>
    </footer>
  )
}

export default Footer
