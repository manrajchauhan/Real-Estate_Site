import PageTitle from '@/components/PageTitle'
import Sidebar from '@/components/ui/sidebar'
import React from 'react'
import DataTable from './DataTableI-Inquery'

const Page = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="flex flex-col gap-5  w-full p-8">
        <PageTitle title="All Inquiries" />
        <DataTable />
      </div>
    </section>
  )
}

export default Page
