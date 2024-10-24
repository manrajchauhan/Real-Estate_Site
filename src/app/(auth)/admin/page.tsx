"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import Loader from '@/components/Loader'

const formSchema = z.object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })

const Page = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password: ""
        },
      })

      const submit = async (email:string,password:string) =>{
        setLoading(true);
        try {
          await axios.post('/api/auth',{email,password})
          .then((res)=>{
            toast.success(res.data.message);
            router.push('/dashboard');
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        } catch (error:any) {
          toast.error(error.response.data.message);
        } finally{
          setLoading(false);
        }
      }
      function onSubmit(values: z.infer<typeof formSchema>) {
        submit(values.username,values.password,);
      }
      
  return (
    <>
    <div className="h-screen border flex justify-center items-center">
      <div className="w-fit border shadow-md rounded-xl p-10 md:w-[30rem]">
      <div className="flex justify-center"><h1 className='text-2xl text-secondary font-medium'>Admin Panel</h1></div>
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input autoComplete='off' placeholder="Enter the username" {...field} />
          </FormControl>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
          <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input autoComplete='off' placeholder="Enter the password" {...field} />
          </FormControl>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
    <div className="flex justify-between items-center">
    <Button type="submit" className='bg-secondary hover:bg-secondaryHover'>Submit{loading?<Loader/>:''}</Button>      
    <p onClick={()=>router.push('/reset')} className=' hover:underline cursor-pointer'>Forgot password</p>
    </div>
  </form>
</Form>
</div>
</div>
  </>
  )
}

export default Page
