import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import Homeicon from '../assets/home.png'
import Handpicked from '../assets/home/01.jpg'
import FairPrice from '../assets/home/02.jpg'
import Legally from '../assets/home/03.jpg'
import Image from 'next/image';
import { Check } from 'lucide-react';
import Message from '../components/Message'
import Loan from './Loan';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';
import Review from './Review';
import Partners from './Partners';

const MainBotttom = () => {
  return (
    <>
      {/* bought in */}
      <InfiniteMovingCards />
      {/* <div className='parallex-container bg-fixed px-14 mt-20 py-10 text-white relative flex justify-center items-center overflow-hidden'>
        <div className="bg-black/40 absolute top-0 left-0 w-full h-full"></div>
        <span className="relative">
          <p className='text-lg'>Find the perfect property among our ever-growing listings</p>
          <p className="text-lg">Let us assist you in finding the home that fits your life</p>
          <h1 className='text-3xl tracking-tight mt-2 mb-2'>Your Dream Home Awaits</h1>
          <a target='_blank' className='flex items-center  gap-2 bg-white w-fit text-heading px-3 py-3 mt-10' href="https://wa.me/917679134281?text=Hi One India! I am looking for a home in Powai and would love to chat."><FaWhatsapp className='text-2xl text-green-500' />Chat with Us</a>
        </span>
        <Image src={Homeicon.src} height={0} width={0} sizes='100vw' alt='home icon' className='relative w-60 h-auto ml-10' />
      </div> */}

      {/* <div className="px-14 py-20 relative">
        <svg className="border w-full h-full absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160">
          <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="#D83A4E" fill="transparent" />
        </svg>

        <h1 className="text-5xl text-mainprimary font-medium tracking-tight mb-2">Homes You'll Fall For</h1>
        <h1 className="text-heading text-2xl ">Every One India home is</h1>
        <section className="grid grid-cols-3 gap-20 mt-10 relative">
          <div className="shadow-home-card bg-lightgraycolor flex justify-center rounded-t-full relative overflow-hidden">
            <Image src="https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height={0} width={0} sizes='100vw' alt='home icon' className=' w-full h-[30dvw] object-cover' />
            <div className="bg-black/20 absolute top-0 left-0 w-full h-full"></div>
            <div className="absolute left-0 bottom-0 text-white p-3">
              <h1 className='font-medium text-2xl'>01. Handpicked</h1>
              <p className='text-lg tracking-tight'>Only homes we would buy ourselves.Fair price guaranteed.</p>
            </div>
          </div>
          <div className="shadow-home-card bg-lightgraycolor rounded-t-full  overflow-hidden relative -top-28">
            <Image src="https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height={0} width={0} sizes='100vw' alt='home icon' className=' w-full h-[30dvw] object-cover' />
            <div className="bg-black/20 absolute top-0 left-0 w-full h-full"></div>
            <div className="absolute left-0 bottom-0 text-white p-3">
              <h1 className='font-medium text-2xl'>02. Fair Price Ensured.</h1>
              <p className='text-lg tracking-tight'>Backed by real transaction data from One India.</p>
            </div>
          </div>
          <div className="shadow-home-card bg-lightgraycolor rounded-t-full relative overflow-hidden">
            <Image src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" height={0} width={0} sizes='100vw' alt='home icon' className=' w-full h-[30dvw] object-cover' />
            <div className="bg-black/20 absolute top-0 left-0 w-full h-full"></div>
            <div className="absolute left-0 bottom-0 text-white p-3">
              <h1 className='font-medium text-2xl'>03. Legally Cleared.</h1>
              <p className='text-lg tracking-tight'>Title clearance assured by One India.</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 text-2xl mt-20">

          <div className="flex flex-col">
            <div className="border p-12 flex-1">
              <h1 className='text-mainprimary'>01</h1>
              <h1 className='text-heading'>Handpicked.</h1>
              <p className='text-xl text-headingchild'>
                Only homes we would buy ourselves. Fair price guaranteed.
              </p>
            </div>
            <Image
              src={Handpicked.src}
              alt='home'
              height={0}
              width={0}
              sizes='100vw'
              className='w-full h-auto mt-5 object-cover '
            />
          </div>

          <div className="flex flex-col">
            <Image
              src={FairPrice.src}
              alt='home'
              height={0}
              width={0}
              sizes='100vw'
              className='w-full h-72 object-cover'
            />
            <div className="border p-12 mt-5 mb-5 flex-1">
              <h1 className='text-mainprimary'>02</h1>
              <h1 className='text-heading'>Fair Price Ensured.</h1>
              <p className='text-xl text-headingchild'>
                Backed by real transaction data from One India.
              </p>
            </div>
            <Image
              src={Legally.src}
              alt='home'
              height={0}
              width={0}
              sizes='100vw'
              className='w-full h-auto object-cover '
            />
            <div className="border p-12 mt-5 flex-1">
              <h1 className='text-mainprimary'>03</h1>
              <h1 className='text-heading'>Legally Cleared.</h1>
              <p className='text-xl text-headingchild'>
                Title clearance assured by One India.
              </p>
            </div>
          </div>
        </section>
        <div className="relative text-white mt-5">
          <Image
            src={Legally.src}
            alt='home'
            height={0}
            width={0}
            sizes='100vw'
            className='w-full h-72 object-cover '
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 rounded-lg">
            <section className='flex flex-col gap-5'>
              <h1 className="text-2xl ">04</h1>
              <h1 className='text-5xl'>Upgraded.</h1>
              <p>Quality audited and renovated for you</p>
            </section>
          </div>
        </div>
      </div> */}

      {/* JUST PICK THE HOME YOU LOVE */}
      {/* <div className="px-14 pt-40  relative text-white flex flex-col items-center">
        <video
          src="/relax.mp4"
          autoPlay
          muted
          loop
          className='w-full h-full object-cover -z-20 absolute top-0 left-0'></video>
        <div className="bg-black/40 absolute top-0 left-0 w-full h-full"></div>
        <h1 className='relative text-2xl text-center'>Let us handle all the details while you focus on moving in</h1>
        <h1 className="relative text-5xl text-center tracking-tight font-medium mt-2">Choose Your Dream Home</h1>
        <section className='flex relative items-center gap-14 mt-10 mb-20'>
          <Image src={'/oneindia.svg'} width={0} height={0} sizes='100vw' alt='logo' className='size-96' />
          <ul className='flex flex-col gap-3'>
            {LegalCheck.map(({ content }, index) => (
              <li key={index} className="text-xl flex gap-2"><Check className='' />{content}</li>
            ))}
          </ul>
        </section>
      </div> */}

      <Review />
      {/* <Loan /> */}
      {/* <Partners /> */}
      {/* <Message /> */}
    </>
  )
}

export default MainBotttom




const LegalCheck = [
  {
    content: "Legal checks and verifications",
  },
  {
    content: "Registration and documentation",
  },
  {
    content: "Society formalities",
  },
  {
    content: "Loan negotiations and best offers",
  },
  {
    content: "Property registration",
  },
  {
    content: "Utility transfers (electricity and gas)",
  }
];
