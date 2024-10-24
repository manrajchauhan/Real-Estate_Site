import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>

      <footer className='text-white py-12 px-8'>
        <div className='container mx-auto flex flex-col md:flex-row justify-start gap-20 items-center'>
          <section className='text-center md:text-left mb-6 md:mb-0 leading-[50px]'>
            <h1 className='text-[60px] font-extrabold text-black tracking-tighter'>
              Great homes in
            </h1>
            <h1 className='text-[#ff6314] text-[60px] font-extrabold tracking-tighter'>
              Great societies.
            </h1>
          </section>
          <ul className='flex md:grid gap-4 md:gap-8 text-sm text-neutral-700 font-medium'>
          <li><Link className=' duration-300 border p-2 rounded-[18px] border-neutral-300' href={'/sell'}>Sell Your House</Link></li>
            <li><Link className='border p-2 rounded-[18px] border-neutral-300 duration-300' href={'/contact'}>Contact Us</Link></li>
            <li><Link className='border p-2 rounded-[18px] border-neutral-300 duration-300' href={'/careers'}>Careers</Link></li>
          </ul>
          <ul className='flex md:grid gap-4 md:gap-8 text-sm text-neutral-700 font-medium'>
          <li><Link className=' duration-300 border p-2 rounded-[18px] border-neutral-300' href={'/rent'}>Rent Your House</Link></li>
            <li><Link className='border p-2 rounded-[18px] border-neutral-300 duration-300' href={'/about'}>About</Link></li>
            <li><Link className='border p-2 rounded-[18px] border-neutral-300 duration-300' href={'/properties'}>Properties</Link></li>
          </ul>
        </div>
        <div className='px-16 text-gray-400 mt-8'>
          <p>&copy; {new Date().getFullYear()} One India Realty. All rights reserved.</p>
        </div>
      </footer>


    </>
  )
}

export default Footer
