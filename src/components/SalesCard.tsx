import { Phone } from 'lucide-react'
import React from 'react'

export type SalesProps = {
    name: string
    phoneno: number
    date: any,
    status: string
}

export default function SalesCard(props: SalesProps) {

    const Status = (statusdata: string) => {
        switch (statusdata) {
            case "open":
                return (
                    <p className='bg-safe text-white px-4 py-1 rounded-md'>{statusdata}</p>
                )
            case "processing":
                return (
                    <p className='bg-yellow-500 text-white px-4 py-1 rounded-md'>{statusdata}</p>
                )
            case "closed":
                return (
                    <p className='bg-danger text-white px-4 py-1 rounded-md'>{statusdata}</p>
                )

        }
    }
    return (
        <div className='flex justify-between gap-3'>
            <section className='flex justify-between gap-3'>
                <div className='h-12 w-12 rounded-full bg-gray-100 p-1'>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${props.name}`} alt="avatar" width={200} height={200} />
                </div>
                <div className='text-sm'>
                    <p>{props.name}</p>
                    <div className='text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400'>
                        {props.phoneno}
                    </div>
                </div>
            </section>
            <div className="min-w-40 flex justify-center items-center">
                {Status(props.status)}
            </div>
            <p>{new Date(props.date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            })}</p>
        </div>
    )
}
