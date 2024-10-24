/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";
import React from 'react'
import PageTitle from "@/components/PageTitle";
import Sidebar from "@/components/ui/sidebar";

import DataTable from "./DataTable";

type Props = {};

export default function UsersPage({ }: Props) {
  return (
    <section className="flex">
      <Sidebar />
      <div className="flex flex-col gap-5  w-full p-8">
        <PageTitle title="All Properties" />
        <DataTable />
      </div>
    </section>
  );
}
