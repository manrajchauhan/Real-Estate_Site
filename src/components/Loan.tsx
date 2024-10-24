import Image from 'next/image'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const Loan = () => {
  return (
    <>
      <div className='my-20 px-14 flex justify-center items-center bg-mainprimary '>
        <div className="shadow-home-card rounded-t-full relative overflow-hidden -mb-10 mt-10">
          <Image src="https://images.pexels.com/photos/4473892/pexels-photo-4473892.jpeg?auto=compress&cs=tinysrgb&w=600" height={0} width={0} sizes='100vw' alt='home icon' className=' w-[20dvw] h-[20dvw] object-cover' />
        </div>
        <span className="p-10 text-white">
          <section className='w-fit'>
            <p className=' text-sm tracking-wide'>NEED HELP WITH FINANCING ?</p>
            <h1 className=' text-3xl tracking-tight mt-2'>Get loan offers from <br />
              the best banks</h1>
            <a className='flex bg-white text-heading duration-200 hover:bg-lightgraycolor items-center gap-2 w-fit px-3 py-3 mt-10' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat."><FaWhatsapp className='text-2xl text-green-500' />Get Loan Assistance</a>
          </section>
        </span>
      </div>


    </>
  )
}

export default Loan
