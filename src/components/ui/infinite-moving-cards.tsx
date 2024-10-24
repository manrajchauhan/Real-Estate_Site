"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, ChevronRight, Grid2X2, House, MapPin } from 'lucide-react';


export const InfiniteMovingCards = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const pauseOnHover = true;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["boughtin"],
    queryFn: async () => {
      const { data } = await axios.get("/api/boughtin");
      return data.allPropertiesData;
    },
  });

  if (isError) {
    toast.error(error.message);
  }

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setStart(true);
    }
  }, [data]);

  console.log(data);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_80%,transparent)]"
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {data?.map(
          (
            { sortlocation, images, bhk, date, _id, bath, carpetsize }: { sortlocation: string; images: any; bhk: number; date: string, _id: string, bath: number, carpetsize: number },
            idx: number
          ) => (
            <Link key={idx} href={`/propertydetails/${_id}`}>
              <li
                className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 overflow-hidden"

              >
                <blockquote>
                  <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                  ></div>
                  <div className="w-full h-full bg-black/10 absolute top-0 left-0"></div>
                  <Image
                    alt="boughtin"
                    src={images[0].images}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-60 w-full object-cover background-darker"
                  />
                  <div className="bg-black/20 absolute top-0 left-0 h-full w-full"></div>
                  <button className="glass text-heading absolute top-2 right-2 p-2 text-sm">
                    Bought in{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </button>
                  <ul className='flex justify-between text-sm absolute bottom-0 w-full text-white px-5 py-2'>
                    <li className="flex items-center gap-2"><span className=''><Bed /></span>{bhk} BHK</li>
                    <li className="flex items-center gap-2"><Bath />{bath} Bath</li>
                    <li className="flex items-center gap-2"><Grid2X2 />{carpetsize} sq.ft</li>
                  </ul>
                </blockquote>
              </li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
};
