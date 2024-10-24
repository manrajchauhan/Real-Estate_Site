import { MoveRight } from 'lucide-react'
import React from 'react'

const HeroBottom = () => {
  return (
    <div className=''>
      <div className="px-14 text-white flex flex-col gap-4 pb-16">
      <li className='text-lg mt-40 w-80 list-disc tracking-normal'>Discover modern, sustainable living spaces in the heart of the city.</li>
      <h1 className='font-extrabold text-[80px] tracking-tighter'>Find  Your Desired </h1>
      <h1 className='font-extrabold text-[80px] tracking-tighter mt-[-46px]'>Home For You.</h1>
      <a href='#property' className='border border-white duration-200 p-5 w-fit hover:bg-white/80 bg-white text-lg rounded-md flex gap-2 text-black tracking-tighter'>Explore Properties<MoveRight/></a>
      </div>
    </div>
  )
}

export default HeroBottom
