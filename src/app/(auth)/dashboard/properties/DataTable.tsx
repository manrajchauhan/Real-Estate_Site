"use client";
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from 'axios';
import { HousePlus, Loader2, Pencil, Trash2, ArrowDown01, House } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

interface Property {
  _id: string,
  bhk: number,
  bath: number,
  carpetsize: number,
  createdAt: Date,
  description: string,
  fulllocation: string,
  name: string,
  parking: number,
  price: number,
  requirement: string,
  sortlocation: string,
  type: string,
  updatedAt: Date,
  bought: boolean
}

const DataTable = () => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const deleteProperty = async (_id: string) => {
    try {
      await axios.delete(`/api/delete/${_id}`)
        .then((res) => {
          setShowDeleteConfirm(pre => !pre);
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIndex(-1);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllProperties', showDeleteConfirm],
    queryFn: async () => {
      const { data } = await axios.get('/api/admindashboard');
      return data.allProperties as Property[];
    }
  });

  if (isError) {
    toast.error(error.message);
  }

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.sortlocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const columns: ColumnDef<Property>[] = [
    { accessorKey: 'name', header: 'Property Name',
      cell: ({ cell }:{cell:any}) => (
        <div className="flex items-center">
          <House className="mr-2" />
          {cell.getValue()}
        </div>
      ) 
     },
    { accessorKey: 'bought', header: 'Bought', cell: info => info.getValue() ? 'true' : 'false' },
    { accessorKey: 'requirement', header: 'Situation' },
    { accessorKey: 'sortlocation', header: 'Location' },
    { accessorKey: 'carpetsize', header: 'Carpet Size', cell: info => `${info.getValue()} sq.ft` },
    { accessorKey: 'bath', header: 'Bath' },
    { accessorKey: 'bhk', header: 'BHK' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'createdAt', header: 'List Date', cell: info => new Date(info.getValue() as string).toDateString() },
    {
      id: 'delete',
      header: 'Delete',
      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger>
            {index === row.index ? <Loader2 className='text-danger animate-spin cursor-not-allowed' /> : <Trash2 className='text-danger cursor-pointer duration-300 hover:scale-125' />}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-danger hover:bg-dangerhover'
                onClick={() => { deleteProperty(row.original._id); setIndex(row.index); }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      id: 'edit',
      header: 'Edit',
      cell: ({ row }) => (
        <Pencil onClick={() => router.push(`/dashboard/${row.original._id}`)} className='text-safe cursor-pointer duration-300 hover:scale-125' />
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting
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

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold opacity-60'>Total Entry: {filteredData.length}</h1>
        {isLoading && (
          <Loader2 className='animate-spin opacity-60' />
        )}
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2"
        />
        <Button className='bg-safe hover:bg-safehover' onClick={() => router.push('/dashboard/upload')}>
          <HousePlus />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => handleSort(header.id)}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowDown01
                            className={`ml-2 ${
                              sorting[0]?.id === header.id
                                ? (sorting[0]?.desc ? 'rotate-180' : '')
                                : 'text-gray-500'
                            }`}
                          />
                        </div>
                      )
                    }
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
    Page <span className='text-mainprimary'>{table.getState().pagination.pageIndex + 1}</span> of {table.getPageCount()}
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
