"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from "axios";
import {
  Loader2,
  ArrowDown01,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

interface Inquery {
  _id: string;
  createdAt: Date;
  inquirystatus: string;
  name: string;
  note: string;
  phoneno: number;
  updatedAt: Date;
}

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

const DataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const {mutate:updatenewinquiry} =  useMutation({
    mutationFn: ()=> axios.put("/api/updatenewinquiry")
  })


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getinquiry"],
    queryFn: async () => {
      const { data } = await axios.get("/api/getinquiry");
      return data.allinquiry as Inquery[];
    },
    refetchInterval: 1000*2,
  });
  if (isError) {
    toast.error(error.message);
  }

  const { mutate, isSuccess:updatesuccess, isError:updateIsError, error:updateError} = useMutation({
    mutationFn: (values: { status: string; id: string })=> axios.put('/api/inquerystatusupdate',values)
  })
  if(updatesuccess){
    toast.success("Status updated successfully")
  }
  if (updateIsError) {
    toast.error(updateError.message);
  }

  const UpdateStatus = (value:string,id:string)=>{
    const values = { status: value, id}
    mutate(values)
  }

  const columns: ColumnDef<Inquery>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ cell }: { cell: any }) => (
        <div className="flex items-center gap-2">
          <div className='h-12 w-12 rounded-full bg-gray-100 p-1'>
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${cell.getValue()}`} alt="avatar" width={100} height={100} />
          </div>
          {cell.getValue()}
        </div>
      ),
    },
    {
      accessorKey: "phoneno",
      header: "Phone No",
      cell: (info) => (info.getValue()),
    },
    {
      accessorKey: "inquirystatus",
      header: "Status",
      cell: ({ cell }: { cell: any }) => (
        <div className="flex items-center">
          {Status(cell.getValue())}
        </div>
      ),
    },
    {
      accessorKey: "note",
      header: "Messages",
      cell: (info) => `${info.getValue()}`,
    },

    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleString(
        "en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }
      ),
    },
    {
      // id: "edit",
      accessorKey: "inquirystatus",
      header: "Update Status",
      cell: ({ row, cell}) => (
        <Select value={cell.getValue() as string} onValueChange={(value)=>UpdateStatus(value,row.original._id)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSort = (columnId: string) => {
    const isDesc = sorting[0]?.id === columnId && sorting[0]?.desc;
    setSorting([{ id: columnId, desc: !isDesc }]);
  };
  useEffect(() => {
    updatenewinquiry();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold opacity-60">
          Total Entry: {data ? data.length : 0}
        </h1>
        {isLoading && <Loader2 className="animate-spin opacity-60" />}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort(header.id)}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <ArrowDown01
                          className={`ml-2 ${sorting[0]?.id === header.id
                              ? sorting[0]?.desc
                                ? "rotate-180"
                                : ""
                              : "text-gray-500"
                            }`}
                        />
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-center">
          Page{" "}
          <span className="text-mainprimary">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
