"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

const Navbar = () => {
  const router = useRouter();

  const logout = async () =>{
    try {
      await axios.get('/api/logout')
      .then((res)=>{
        toast.success(res.data.message);
        router.push('/');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAdminDetails'],
    queryFn: async () =>{
      const  {data} = await axios.get('/api/admindetails');
      return data
    }
  })

if(isError){
  logout();
  toast.error(error.message)
}
  return (
    <div>
      <div className='flex justify-between px-5 py-4 shadow items-center'>
      <h1 className='text-secondary text-2xl font-bold md:text-3xl'>Upload</h1>
      <h1 className='hidden text-lightgray text-2xl font-bold md:text-3xl md:block'>{isLoading?"Loading...":data?.message}</h1>
      <Button onClick={()=>logout()} className='bg-danger hover:bg-dangerhover'>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar
