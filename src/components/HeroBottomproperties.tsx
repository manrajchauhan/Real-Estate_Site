import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

const HeroBottom = ({ bhk, parking, location, name, bath, sq, price, floor }: { bhk: number, parking: string, location: string, name: string, bath: number, sq: number, price: number, floor: string }) => {
  return (
    // <div className='px-14'>
    //   <div className=" text-black flex flex-col gap-4 pb-16">
    //   <h6 className=' text-xl'>{bhk}BHK in {location}</h6>
    //   <h1 className='font-medium text-6xl'>{name}</h1>
    //   </div>

    //   <ul className='text-black flex justify-between border-t border-white py-8'>
    //     <ol className="flex gap-20 items-center justify-center">
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{bhk}</p>
    //           BHK
    //       </li>
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{bath}</p>
    //           BATHS
    //       </li>
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{parking}</p>
    //           PARKING
    //       </li>
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{floor}</p>
    //           FLOOR
    //       </li>
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{sq}</p>
    //           SQ FT
    //       </li>
    //       <li className="flex flex-col">
    //         <p className='text-2xl'>{price}</p>
    //         AGREEMENT VALUE
    //       </li>
    //       </ol>
    //       <a className='flex items-center gap-2 bg-white w-fit text-heading px-3 py-3 ' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat."><FaWhatsapp className='text-2xl' />Schedule a visit</a>
    //   </ul>

    // </div>
    <div className='mt-10 px-14 rounded-lg shadow-lg'>
      <div className="text-black flex flex-col gap-4 pb-10">
        <h1 className='font-semibold text-6xl tracking-tight'>{name}</h1>
        <h6 className='text-xl font-light tracking-tight'>{location}</h6>
        <h1 className='text-5xl font-bold tracking-tighter'>₹ {price}</h1>
      </div>

      <ul className='text-black flex justify-between border-t border-neutral-300 py-8'>
        <ol className="flex gap-10 items-center justify-center">
          <li className="flex flex-col items-center">
            <p className='text-3xl font-normal'>{bhk}</p>
            <span className='text-sm'>BHK</span>
          </li>
          <li className="flex flex-col items-center">
            <p className='text-3xl font-normal'>{bath}</p>
            <span className='text-sm'>BATHS</span>
          </li>
          <li className="flex flex-col items-center">
            <p className='text-3xl font-normal'>{parking}</p>
            <span className='text-sm'>PARKING</span>
          </li>
          <li className="flex flex-col items-center">
            <p className='text-3xl font-normal'>{floor}</p>
            <span className='text-sm'>FLOOR</span>
          </li>
          <li className="flex flex-col items-center">
            <p className='text-3xl font-normal'>{sq}</p>
            <span className='text-sm'>SQ FT</span>
          </li>
        </ol>
        {/* <a
          className='flex items-center gap-2 text-black bg-neutral-50 transition duration-300 w-fit px-4 py-2 rounded-md shadow-md border'
          href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat."
        >
          <FaWhatsapp className='text-2xl text-green-500' />Make a visit
        </a> */}
      </ul>
    </div>

  )
}

export default HeroBottom
