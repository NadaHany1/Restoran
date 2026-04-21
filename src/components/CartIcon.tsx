import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  return (
    <Link href="/cart" className='flex items-center justify-center gap-1 flex-nowrap'>
        <p> CART </p>
    </Link>
  )
}

export default CartIcon
