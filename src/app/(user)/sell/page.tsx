import NavBar from '@/components/NavBar'
import { Check, Clock4, Coins } from 'lucide-react'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import Message from '@/components/Message'
import Footer from '@/components/Footer'
import Review from '@/components/Review'
import Faq from '@/components/Faq'
import Partners from '@/components/Partners'

const Page = () => {
  return (
    <div>
      <NavBar />
      <h1 className='text-6xl text-heading font-medium text-center flex flex-col gap-2 mt-20'>
        <span className='text-mainprimary'>The fastest way to</span>
        <span>sell your house</span>
      </h1>
      <p className='text-headingchild mx-auto text-sm flex gap-2 items-center mt-10 w-fit'><Clock4 className='size-5' />AVERAGE TIME TO SELL - 19 DAYS</p>
      <section className='flex mx-auto gap-5 w-fit'>
        <a className='flex  items-center gap-2 bg-heading w-fit text-white px-3 py-3 mt-10' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat."><FaWhatsapp className='text-2xl' />Get an offer</a>
        <a className='flex  items-center border border-heading gap-2 w-fit text-heading px-3 py-3 mt-10' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat.">How it works</a>
      </section>

      {/* JUST PICK THE HOME YOU LOVE */}
      <div className="px-14 pt-20  my-20 bg-mainprimary text-white flex flex-col items-center">
        <h1 className='text-2xl text-center'>NO MORE RUNNING AROUND</h1>
        <h1 className="text-5xl text-center tracking-tight mt-2">We take care of everything</h1>

        <section className='flex  items-center gap-14 mt-10 mb-20'>
          <Image src={'/oneindia.svg'} width={0} height={0} sizes='100vw' alt='logo' className='size-96' />
          <ul className='flex flex-col gap-3'>
            {LegalCheck.map(({ content }, index) => (
              <li key={index} className="text-xl flex gap-2"><Check className='' />{content}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* WE HAVE THE MOST */}
      <div className='px-14 flex justify-center gap-40 mb-20'>
        <section className="flex flex-col justify-between">
          <span className="">
            <h1 className='text-2xl text-headingchild'>WE HAVE THE MOST</h1>
            <h1 className='text-mainprimary font-medium text-5xl tracking-tight mt-2'>Seller friendly model.</h1>
          </span>
          <div className='text-headingchild border p-6 w-fit mt-4'>
            <Coins className='text-mainprimary mb-4' />
            <p className='text-md'>ZERO COMMISIONS. NO HIDDEN FEES</p>
            <p className='text-sm mt-1'>No brokerage . No staging or marketing fee</p>
          </div>
        </section>
        <section className="flex flex-col gap-10">
          {Sellermodel.map(({ heading, para }, index) => (
            <div key={index} className="text-headingchild flex gap-5">
              <div className="">
                <Check className='text-mainprimary border border-mainprimary' />
              </div>
              <span className="">
                <h1 className='text-xl'>{heading}</h1>
                <p>{para}</p>
              </span>
            </div>
          ))}
        </section>
      </div>
      <Review />
      <Faq />
      <Partners />
      <Message />
      <Footer />
    </div>
  )
}

export default Page

const Sellermodel = [
  {
    heading: 'Guaranteed sale',
    para: "or we pay you a penalty"
  },
  {
    heading: 'Competitive Offer',
    para: "You get the agreed price even if we sell for less"
  },
  {
    heading: 'Receive immediate token',
    para: "Once you accept the offer"
  },
  {
    heading: 'Get rent till we sell',
    para: "Market rent. Every month till we sell"
  }
]

const LegalCheck = [
  {
    content: "All Paperwork",
  },
  {
    content: "Refurbish the house",
  },
  {
    content: "Finding buyers",
  },
  {
    content: "Manage inbound queries",
  },
  {
    content: "Organise house visits",
  },
  {
    content: "Maintenance of the house",
  },
  {
    content: "Registration procedures",
  },
  {
    content: "Loan closing assistance",
  },
  {
    content: "Society procedures",
  }
];
