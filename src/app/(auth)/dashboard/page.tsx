"use client"
import BarChart from "@/components/BarChart";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/card";
import { Activity,  Bell,  House, MoveRight} from "lucide-react";
import SalesCard from "@/components/SalesCard";
import Sidebar from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Home() {


  const { data } = useQuery({
    queryKey: ["getAllPropertiesData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admindashboard");
      return data;
    },
  })

  const { data:inquiry } = useQuery({
    queryKey: ["getAllInquiyiData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/getinquiry");
      return data;
    },
    refetchInterval:1000*1
  })

  const { data:openinquiry} = useQuery({
    queryKey: ["openInquiyData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/newinquery");
      return data.openinquiry
    },
    refetchInterval: 1000,
    staleTime: 0
  })

  const cardData: CardProps[] = [
    {
      label: "Total Properties",
      amount: data?.totalPropertiesLength || "Loading...",
      icon: House
    },
    {
      label: "Buy",
      amount: data?.totalBuyProperties[0].totalBuyProperties || "Loading...",
      icon: Activity
    },
    {
      label: "Rent",
      amount: data?.totalRentProperties[0].totalrentProperties || "Loading...",
      icon: Activity
    },
    {
      label: "Bought In",
      amount: data?.totalBoughtProperties[0].totalboughtProperties || "Loading...",
      icon: Activity
    }
  ]

  return (
    <section className="flex">
      <Sidebar/>
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Dashboard"/>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((data, index) => (
          <Card 
            key={index}
            amount={data.amount}
            icon={data.icon}
            label={data.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart/>
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section className="flex justify-between">
            <span className="">
            <div className="flex gap-2">Recent Inquiry
              <Link href={'/dashboard/Inquiries'} className="relative">
              {openinquiry!=0 && (
              <p className="absolute text-sm -top-1 -right-1 bg-mainprimary text-white rounded-full w-4 h-4 flex items-center justify-center">{openinquiry}</p>
              )}
              <Bell/>
              </Link>
              </div>
            <p className="text-sm text-gray-400">
              You made <span className="text-mainprimary">{inquiry?.allinquiry.length}</span> inquiries in total.
            </p>
            </span>
            <Link href={'/dashboard/Inquiries'} className="text-sm text-gray-400 flex items-center gap-1 duration-200 hover:opacity-65">View all<MoveRight/></Link>
          </section>
          <Separator/>
          {inquiry?.inquiryLimit.map(({name,phoneno,inquirystatus,createdAt}:{name:string,phoneno:number, inquirystatus:string,createdAt:any}, index:number) => (
            <SalesCard
              key={index}
              phoneno={phoneno}
              name={name}
              date={createdAt}
              status={inquirystatus}
            />
          ))}
        </CardContent>
      </section>
    </div>
    </section>

  )
}
