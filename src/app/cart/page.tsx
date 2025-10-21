import Image from 'next/image'
import React from 'react'

const CartPage = () => {
  return (
    <div>
      <div className="my-6">
        <div className="bg-white divide-y divide-gray-300 px-4">


          <div className="grid md:grid-cols-4 items-center md:gap-4 gap-6 py-4">
            <div className="col-span-2 flex items-center gap-6">
              <div className="w-20 h-20 relative shrink-0">
                <Image src='/temporary/p1.png' alt="" fill className="w-full h-full object-contain relative"/>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">Dark Green T-shirt</h3>
                <h6 className="text-sm text-slate-500 mt-1">Color: <span className="ml-2 font-semibold">Dark Green</span></h6>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 124 124">
                  <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
              </button>
              <span className="font-semibold text-[15px] leading-[18px]">2</span>
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 42 42">
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <h4 className="text-[15px] font-semibold text-slate-900">$20.00</h4>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-red-500 ml-auto" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-4 items-center md:gap-4 gap-6 py-4">
            <div className="col-span-2 flex items-center gap-6">
              <div className="w-20 h-20 relative shrink-0">
                <Image src='' alt="" fill className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">Winter Sweater</h3>
                <h6 className="text-sm text-slate-500 mt-1">Color: <span className="ml-2 font-semibold">Black</span></h6>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 124 124">
                  <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
              </button>
              <span className="font-semibold text-[15px] leading-[18px]">1</span>
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 42 42">
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <h4 className="text-[15px] font-semibold text-slate-900">$20.00</h4>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-red-500 ml-auto" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-4 items-center md:gap-4 gap-6 py-4">
            <div className="col-span-2 flex items-center gap-6">
              <div className="w-20 h-20 relative shrink-0">
                <Image src='' alt="" fill className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">Echo Elegance</h3>
                <h6 className="text-sm text-slate-500 mt-1">Color: <span className="ml-2 font-semibold">Black/White</span></h6>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 124 124">
                  <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
              </button>
              <span className="font-semibold text-[15px] leading-[18px]">2</span>
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 42 42">
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <h4 className="text-[15px] font-semibold text-slate-900">$24.00</h4>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-red-500 ml-auto" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-4 items-center md:gap-4 gap-6 py-4">
            <div className="col-span-2 flex items-center gap-6">
              <div className="w-20 h-20 relative shrink-0">
                <Image src='' alt="" fill className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">Smart Watch Timex</h3>
                <h6 className="text-sm text-slate-500 mt-1">Color: <span className="ml-2 font-semibold">Gray</span></h6>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 124 124">
                  <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
              </button>
              <span className="font-semibold text-[15px] leading-[18px]">2</span>
              <button type="button"
                className="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-black" viewBox="0 0 42 42">
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <h4 className="text-[15px] font-semibold text-slate-900">$22.00</h4>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-red-500 ml-auto" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-sm p-6 mt-8">
          <ul className="text-slate-500 font-medium divide-y divide-gray-300">
            <li className="flex flex-wrap gap-4 text-sm pb-4">Subtotal <span className="ml-auto font-semibold text-slate-900">$152.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm py-4">Shipping <span className="ml-auto font-semibold text-slate-900">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm py-4">Tax <span className="ml-auto font-semibold text-slate-900">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm pt-4 font-semibold text-slate-900">Total <span className="ml-auto">$160.00</span></li>
          </ul>
        </div>
      </div>

      <button id="openModal" type="button"
        className="mt-4 mx-auto block px-4 py-2.5 rounded-md text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Open
        Shopping Cart</button>
    </div>
  )
}

export default CartPage
