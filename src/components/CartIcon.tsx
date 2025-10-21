import Link from 'next/link'
import React from 'react'
// import Image from 'next/image'

const CartIcon = () => {
  return (
    <Link href="/cart" className='flex items-center justify-center gap-1 flex-nowrap'>
        <p> cart <sup>(3)</sup> </p>
    </Link>
  )
}

export default CartIcon
