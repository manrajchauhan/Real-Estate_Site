"use client"
import React, { useState, FC, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from '@/components/Loader'
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

const formSchema = z.object({
    newpassword: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    confirmpassword: z.string().min(4, {
        message: "Password must be at least 4 characters.",
      }),
  })

  interface PageProps {
    params: {
      token: string,
    };
  }
const Page:FC<PageProps> = ({params}) => {
  const [loading , setLoading] = useState<boolean>(false);
  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          newpassword: "",
          confirmpassword: ""
        },
      })

      const submit = async (password:string,token:string) =>{
        setLoading(true);
        try {
          await axios.post('/api/resetpassword',{password,token})
          .then((res)=>{
            toast.success(res.data.message);
            router.push('/admin');
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        } catch (error:any) {
          toast.error(error.response.data.message);

        }finally{
          setLoading(false);
        }
      }

      function onSubmit(values: z.infer<typeof formSchema>) {
        if(values.newpassword!=values.confirmpassword){
          toast.warning("New password and confirm password must be the same");
          return;
        }
        submit(values.newpassword,params.token);
      }

      const ValidateUser = async (token:string) =>{
        try {
          await axios.post('/api/validateuser',{token})
          .then((res)=>{
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        } catch (error:any) {
          toast.error(error.response.data.message);
        }
      }

      useEffect(()=>{
        ValidateUser(params.token);
      },[params.token]);

  return (
    <>
      <div className="w-fit m-auto my-auto mt-[20vh] shadow-md rounded-xl p-10 md:w-[30rem]">
      <IoMdArrowRoundBack className='text-2xl cursor-pointer' onClick={()=>router.push('/admin')} />
      <div className="flex justify-center"><h1 className='text-2xl text-secondary font-medium'>Reset Password</h1></div>
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
    <FormField
      control={form.control}
      name="newpassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input autoComplete='off' placeholder="Enter the new username" {...field} />
          </FormControl>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
          <FormField
      control={form.control}
      name="confirmpassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input autoComplete='off' placeholder="Enter the confirm password" {...field} />
          </FormControl>
          <FormMessage></FormMessage>
        </FormItem>
      )}
    />
    <div className="flex justify-between items-center">
    <Button type="submit" className='bg-secondary hover:bg-secondaryHover'>Submit{loading?<Loader/>:''}</Button>      
    </div>
  </form>
</Form>
</div>

  </>
  )
}

export default Page
