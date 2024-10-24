
import NavBar from '@/components/NavBar'
import Image from 'next/image';
import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import AboutImage from "../../../assets/about.jpg"
import Message from '@/components/Message';
import Footer from '@/components/Footer';

const Page = () => {
  return (
    <>
    <div className='relative h-[95vh] overflow-hidden flex flex-col justify-between'>
      <NavBar />
      {/* <HeroBottom/> */}
      <div className=''>
      <div className="px-14 text-white flex flex-col gap-4 pb-16">
      <h6 className=' text-xl'>WE ARE BUILDING</h6>
      <h1 className='font-semibold text-6xl'>Radically delightful</h1>
      <h1 className='font-semibold text-6xl'>home buying and selling</h1>
      <button className='bg-white text-heading p-5 w-fit mt-10 hover:bg-lightgraycolor flex gap-2'><FaWhatsapp className='text-2xl' />Get in touch</button>
      </div>

    </div>
      <div className="bg-black/30 h-full w-full absolute top-0 left-0 -z-10"></div>
      <Image src={AboutImage.src} alt='about' height={0} width={0} sizes='100vw' className='w-full h-auto object-cover -z-20 absolute top-0 left-0'/>
    </div>
    <Message/>
    <Footer/>
    </>
  )
}

export default Page
