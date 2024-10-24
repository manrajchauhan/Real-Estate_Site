import React from 'react'
import Image from 'next/image'
import Happy from '../assets/happy.jpg'

const Review = () => {
  return (
    <section className='mt-10 text-white p-4 relative overflow-hidden bg-[#ff6314]'>
    <div className='p-20 mt-20 mb-20'>
    <li className='text-6xl font-bold tracking-tighter mb-2'>Testimonials</li>
      <h1 className='text-4xl font-light tracking-tighter mb-10'>Real Reviews, Real Experiences</h1>
      <span className="relative text-white text-3xl w-full">
      <h1 className='text-[40px] font-normal leading-[50px] mt-10'>The visit experience and the whole process were special and we were confident that we would love living in our new home</h1>
      <hr className='mt-10 mb-10'/>
      <div className='reviewperson flex gap-4'>
      <Image src={Happy.src} height={0} width={0} sizes='100vw' alt='home icon' className='relative size-20 rounded-full'/>
      <div className='name p-2'>
        <p className='text-[20px] font-semibold tracking-tighter'>Manraj Chauhan</p>
        <p className='text-[16px] text-neutral-100'>CEO, Solsn Technologies.</p>
      </div>
      </div>
        {/* <div className="grid grid-cols-3 gap-10 px-14">
          {clientswords.map(({ name, describe }, index) => (
            <div key={index} className="border bg-lightgraycolor relative flex gap-5 p-5 rounded-xl overflow-hidden">
              <span className="bg-mainprimary size-10 blur-2xl rounded-full absolute top-0 left-60"></span>
              <span className="bg-mainprimary size-10 blur-2xl rounded-full absolute bottom-0 left-0"></span>
              <span className="bg-mainprimary size-10 blur-2xl rounded-full absolute top-0 left-60"></span>
              <Image src={Happy.src} height={0} width={0} sizes='100vw' alt='home icon' className='relative size-20 aspect-square rounded-full object-cover' />
              <section className='relative'>
                <h1 className='text-lg text-heading font-semibold'>{name}</h1>
                <p className="text-lg text-headingchild">“{describe}”</p>
              </section>
            </div>
          ))}
        </div> */}
      </span>
      </div>
    </section>
  )
}

export default Review

const clientswords = [
  {
    name: "Kanika & Shashank",
    describe: "The visit experience and the whole process were special and we were confident that we would love living in our new home",
  },
  {
    name: "Rashmi & Abhay",
    describe: "I really appreciate the integrity and ethos with which you guys operate. This is a super impressive culture to display - you will go far.",
  },
  {
    name: "Rinaali & Vikas",
    describe: "One India gained our trust from the first call with proper data backing and made the whole buying experience super quick and convenient",
  }
]
