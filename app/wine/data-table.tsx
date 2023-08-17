"use client";

// Set up for ss manual pagination

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/store";
import { Bottle } from "@prisma/client";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";

type Props = {
  search: string;
};

export type WineData = {
  id: number;
  producer: string;
  wineName: string;
  country: string;
  region: string;
  type: string;
  bottle: Array<Bottle | "">;
};
const DataTable = (props: Props) => {
  const { userId, setUserId } = useGlobalContext();
  const [data, setData] = useState<WineData[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [globalFilter, setGlobalFilter] = React.useState(""); /// Sets or updates the state.globalFilter state.
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    async function fetchData() {
      console.log("Fetch Data [", props.search, "]");
      const response = await fetch(
        `/api/winesearch/${pageIndex}/${pageSize}/${props.search}`
      );
      const data = await response.json();
      console.log(data.pageCount, data.rows);
      setData(data.rows);
      setPageCount(data.pageCount);
    }
    fetchData();
  }, [pageIndex, pageSize, userId, props.search]);

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
      pageCount,
      // globalFilter,
    }),
    // [pageIndex, pageSize, pageCount, globalFilter]
    [pageIndex, pageSize, pageCount]
  );

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount,
    state: {
      pagination,
      // globalFilter,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="container mx-auto py-5">
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* Only show Pagination if there's more than 1 page of results */}
            {data && pageCount > 1 && <DataTablePagination table={table} />}
          </div>
        </>
      </div>
    </div>
  );
};

export default DataTable;
