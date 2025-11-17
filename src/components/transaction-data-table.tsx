"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Copy, FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import InvoiceFormModal from "./invoice-form-modal";
import { toast } from "react-toastify";

// Default data for fallback
const defaultData: TransactionSummary[] = [
  {
    $id: "824842",
    invoiceId: "qwe783j2u29",
    paymentAmount: 8249,
    vatIncluded: 82732,
    paymentDate: "Nov 29, 2025",
    userId: "83n2ie92he2828",
  },
];

export type TransactionSummary = {
  $id: string;
  invoiceId: string;
  paymentAmount: number;
  vatIncluded: number;
  paymentDate: string;
  userId: string;
};

interface DataTableProps {
  data?: TransactionSummary[];
  getColumns: () => ColumnDef<TransactionSummary>[];
  hideFilter: boolean;
  hideModalTriggerButton: boolean;
}

export const exactMatchFilter: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: any
) => {
  const value = row.getValue(columnId);

  return value === filterValue;
};

export function getDefaultColumns(): ColumnDef<TransactionSummary>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "paymentDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.getValue("paymentDate")?.split("T")[0]}</div>
      ),
    },
    {
      accessorKey: "invoiceId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Invoice ID
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const handleCopy = () =>
          navigator.clipboard
            .writeText(row.getValue("invoiceId"))
            .then(() => toast.success("Copied!"));
        return (
          <div
            className="ml-3 lowercase inline-flex items-center gap-1 cursor-pointer select-none text-sm text-muted-foreground hover:text-primary transition-colors active:scale-95"
            onClick={handleCopy}
          >
            {row.getValue("invoiceId")}
            <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          </div>
        );
      },
    },
    {
      accessorKey: "paymentAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Amount
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("paymentAmount"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="ml-3 font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "vatIncluded",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            VAT
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("vatIncluded"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="ml-3 font-medium">{formatted}</div>;
      },
    },
  ];
}

export function TransactionDataTable({
  data = defaultData,
  getColumns = getDefaultColumns,
  hideFilter = true,
  hideModalTriggerButton = true,
}: DataTableProps) {
  const { updateInvoice, deleteInvoice, upsertTransactionSummary } =
    useDatabaseStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = getColumns();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const statusOptions = [
    { value: "Paid", label: "Paid" },
    { value: "Unpaid", label: "Unpaid" },
  ];

  // const statusColumn = table.getColumn("status") || "";
  // const filterValue = statusColumn?.getFilterValue() as string | undefined;

  return (
    <div className="w-full px-4 lg:px-6">
      <div className="flex items-center justify- gap-8 py-4">
        <Input
          placeholder="Search Invoice ID..."
          value={
            (table.getColumn("invoiceId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("invoiceId")?.setFilterValue(event.target.value)
          }
          className="max-w-xs md:max-w-sm"
        />
        {!hideModalTriggerButton && (
          <InvoiceFormModal
            mode="create"
            trigger={
              <Button className="ml-auto text-foreground">
                Create TransactionSummary
              </Button>
            }
          />
        )}
        {!hideFilter && (
          <Select
            value={filterValue ?? ""}
            onValueChange={(value) => {
              statusColumn?.setFilterValue(value === " " ? undefined : value);
            }}
          >
            <SelectTrigger className="hidden md:flex">
              <FilterIcon />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value=" ">All Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="overflow-hidden rounded-md border">
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
}
