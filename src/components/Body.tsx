"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import Image from 'next/image';
import { Bath, Bed, ChevronRight, Grid2X2,MapPin } from 'lucide-react';
import Link from 'next/link';
import Features from './features';

const Body = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['GetPropertiesuser'],
    queryFn: async () => {
      const { data } = await axios.get('/api/getpropertyuser');
      return data.allPropertiesData
    }
  })
  console.log(data)
  if (isError) {
    toast.error(error.message)
  }
  return (
    <>
    <div className=''>
        <Features/>
    </div>
    <main id='property' className='px-20 mb-6'>
    <div className='propt flex col-2'>
    <div className='f1prop'>
      <li className="text-md font-normal mt-10 tracking-tight list-disc">Suitable Location With All Amenities</li>
      <h2 className="text-[70px] font-extrabold tracking-tighter mb-20 bg-clip-text">Discover Your Future Home</h2>
      {/* <span className='text-2xl tracking-tight pr-4 font-bold'>Properties</span> */}
      </div>
      <div className='f2prop mt-16 p-10 ml-20'>
        <Link href={'/properties'} className='text-center border p-2 rounded-[16px] flex t hover:bg-neutral-50 ext-lg tracking-tight'>View all properties <span className=' border ml-2 p-2 rounded-[20px]'><ChevronRight /></span></Link>
      </div>
      </div>
      <section className='grid grid-cols-3 gap-10'>
        {data?.map(({_id,images,bhk,bath,name,price,carpetsize,sortlocation,requirement}:{_id:string,images:any,bhk:number,bath:number, name:string,price:string,carpetsize:number,sortlocation:string,requirement:string},index:number)=>(
        <div key={index}>
        <div className="border overflow-hidden rounded-[20px] p-4 bg-white">
        <section className='relative h-60 overflow-hidden rounded-[20px]'>
        <Image src={images[0]?.images} alt='Property Image' width={0} height={0} sizes='1000vw' className='h-60 w-full object-cover hover:scale-110 duration-100 rounded-[20px] hover:rounded-[20px]'/>
          {/* <button className='glass text-white absolute top-2 right-2 p-2 '>View Details</button> */}
        </section>
        <div className='w-full p-2 mt-2 text-headingchild'>
        <p className='text-lg tracking-tight mt-1 flex fap-2 '>
            {sortlocation}</p>
            {/* <MapPin size={20} /> */}
        <h1 className='text-neutral-800 font-semibold text-[34px] flex items-center gap-2 tracking-tighter'>{name}</h1>
        <ul className='flex justify-between text-md pt-2'>
          <li className="flex items-center gap-2"><span className=''><Bed /></span>{bhk} BHK</li>
          <li className="flex items-center gap-2"><Bath />{bath} Bath</li>
          <li className="flex items-center gap-2"><Grid2X2 />{carpetsize} sq.ft</li>
        </ul>
        <div className='flex justify-between'>
        <li className='text-[30px] flex font-bold items-center gap-2 mt-8 text-black'>₹ {price}</li>
        <div className='mt-12'>
        <Link className='border px-4 p-2 rounded-[8px] text-black hover:bg-neutral-100 ' href={`propertydetails/${_id}`}>View</Link>
        </div>
        </div>
        </div>
      </div>
      </div>
        ))}
      </section>
    </main>
    </>
  )
}

export default Body
