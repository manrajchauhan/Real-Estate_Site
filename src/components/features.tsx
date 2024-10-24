import React from 'react'
import { Crown, Gavel, HandHeart, ScrollText } from 'lucide-react'

function features() {
  return (
    <div className='features'>
    <ul className='text-black flex gap-10 justify-center py-8'>
   {Details.map(({ icon, title, description },index) => (
     <li  key={index} className="border flex pr-20 relative gap-4 p-8 bg-neutral-50 rounded-lg transform transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-105">
       <span className=" absolute top-2 right-2 bg-white/20 rounded-full p-2">
         {icon}
       </span>
       <span className="">
         <p className='font-semibold text-xl list-decimal'>{title}</p>
         <p className='text-md text-neutral-500'>{description}</p>
       </span>
     </li>
   ))}
 </ul>
 </div>
  )
}

export default features

const Details = [
    {
        icon: <Crown />,
        title: 'Fully renovated',
        description: 'Quality audited and upgraded',
      },
    {
      icon: <HandHeart />,
      title: 'Fair Price ensured',
      description: 'Powered by proprietory TruIQ',
    },

    {
        icon: <ScrollText />,
        title: 'Paperwork covered',
        description: 'Just come to sign',
      },
    {
      icon: <Gavel />,
      title: '100% Legal assurance',
      description: 'Title clearance guaranteed',
    },

  ]
