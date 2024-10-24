"use client";
import React, { useState } from "react";
import Image from "next/image";
import Messages from "../assets/message.jpg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneno: z.string().min(10, {
    message: "Phone No must be at least 10 characters.",
  }),
  note: z.string().min(2, {
    message: "Notes must be at least 2 characters.",
  }),
});

const Message = ({details}:{details:any}) => {
  const [sendMessage, setSendMessage] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => axios.post("/api/inquery", values),
    onSuccess: () => {
      setSendMessage(true);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneno: "",
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="relative min-h-[41rem] grid grid-cols-2 justify-center  py-20 overflow-hidden px-52">
      <Image
        src={Messages.src}
        height={0}
        width={0}
        sizes="100vw"
        alt="sky"
        className="w-full h-auto absolute -z-20 top-0 left-0 object-contain blur-sm"
      />
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full overflow-hidden rounded-l-md">
        <CarouselContent>
          {details?.map(({ images}:{images:string}, index:number) => (
            <CarouselItem key={index}>
              <Image src={images} alt="image" width={0} height={0} sizes="100vw" className="w-full h-[32rem] object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="bg-white w-full flex  justify-center items-center flex-col relative p-10 min-w-[30%] rounded-r-md overflow-hidden">
        {sendMessage ? (
          <>
            <h1 className="text-heading text-3xl mb-10">SCHEDULE A CALL</h1>
            <span className="bg-lightgraycolor w-full p-5">
              Thanks! Our team will reach out to you in a short while.
            </span>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">NAME</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="Enter Your Name"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">PHONE NO</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="number"
                        placeholder="Enter Your Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Messages</FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        placeholder="Requirements, Best time for a call, etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="p-6 text-lg" type="submit">
                Send Message
                {isPending ? (
                  <Loader2 className="animate-spin ml-2" />
                ) : null}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Message;
