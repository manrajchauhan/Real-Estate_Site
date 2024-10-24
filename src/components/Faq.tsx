import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
  return (
    <div className='my-20'>
      <h1 className='text-mainprimary text-3xl font-medium text-center mb-10'>Frequently asked questions</h1>
      <Accordion type="single" collapsible className="w-[66rem] mx-auto">
        {Faqcontent.map(({content, description},index)=>(
      <AccordionItem key={index} value={`item${index+1}`}>
      <AccordionTrigger>{content}</AccordionTrigger>
      <AccordionContent>
        {description}
      </AccordionContent>
    </AccordionItem>
        ))}
    </Accordion>
    </div>
  )
}

export default Faq

const Faqcontent = [
  { 
    content:"How do you decide my house price ?",
    description:"Our estimation is based on government-backed, regularly updated research data. We consider not only the house and its attributes but also the society and its amenities to provide a fair value for your property."
  },
  { 
    content:"I am an NRI. Will you help me with the taxation ?",
    description:"We will assist you at every step of the process till the date of registration."
  },
  { 
    content:"How long will it take me to receive the money for my house ?",
    description:"On average, we take 16 days to stage the house and 19 days after that to finalize the buyer and sign an MoU with them with a non-refundable token. After that, it can take anywhere between 15-60 days for you to receive the full amount for your house, depending on the loan status of the property/buyer and your NRI status."
  },
  { 
    content:"I have a loan on my property. Can I still sell through One India ?",
    description:"Yes, and we’re happy to assist you with the additional paperwork."
  },
  { 
    content:"How does One India make money ?",
    description:"We sell the house at a price that's slightly higher than the minimum price that is guaranteed to you. That difference is how we cover all our costs and make money."
  },
  { 
    content:"Who are your VC partners ?",
    description:"We are proudly supported by Stellaris Venture Partners, alongside esteemed angel investors who bring a wealth of experience from diverse industries."
  },
  { 
    content:"If the buyer is taking a loan, what is the process? How does the payment get cleared, and what are the timelines ?",
    description:"One India helps buyers get a home loan for their purchase. We coordinate with the bank, the buyer, and you to complete this process smoothly. Typically, the bank disburses the money to your account 1-2 weeks after registration."
  }
]