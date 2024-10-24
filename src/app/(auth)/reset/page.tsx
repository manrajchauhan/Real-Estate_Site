"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from 'sonner'
import Loader from '@/components/Loader'
const formSchema = z.object({
    email: z.string().min(4,{
        message: "email must be at least 4 characters.",
      }),
  })

const Page = () => {
  const [loading , setLoading] = useState<boolean>(false);
  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: ""
        },
      })

      const submit = async (email:string) =>{
        setLoading(true);
        try {
          await axios.post('/api/reset',{email})
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
        submit(values.email,);
      }
  return (
    <div className="w-fit m-auto my-auto mt-[20vh] shadow-md rounded-xl p-10 md:w-[30rem]">
        <IoMdArrowRoundBack className='text-2xl cursor-pointer' onClick={()=>router.push('/admin')} />
        <div className="flex justify-center">
          <h1 className='text-2xl text-secondary font-medium mb-2'>Reset Panel</h1>
          </div>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input autoComplete='off' placeholder="Enter the Mail address" {...field} />
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <Button type="submit" className='bg-secondary hover:bg-secondaryHover'>Reset{loading?<Loader/>:''}</Button>
    </form>
  </Form>
  </div>
  )
}

export default Page
