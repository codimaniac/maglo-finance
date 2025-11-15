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
import {
  ArrowUpDown,
  ChevronDown,
  FilterIcon,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "react-toastify";
import InvoiceFormModal from "./invoice-form-modal";

// Default data for fallback
const defaultData: Invoice[] = [
  {
    $id: "m5gr84i9",
    clientName: "Ken Smith",
    clientEmail: "ken99@example.com",
    totalAmount: 316,
    dueDate: "2023-11-15",
    status: "Paid",
  },
  {
    $id: "3u1reuv4",
    clientName: "Abe Johnson",
    clientEmail: "Abe45@example.com",
    totalAmount: 242,
    dueDate: "2023-11-20",
    status: "Paid",
  },
  {
    $id: "derv1ws0",
    clientName: "Monserrat Lee",
    clientEmail: "Monserrat44@example.com",
    totalAmount: 837,
    dueDate: "2023-11-25",
    status: "Unpaid",
  },
  {
    $id: "5kma53ae",
    clientName: "Silas Brown",
    clientEmail: "Silas22@example.com",
    totalAmount: 874,
    dueDate: "2023-12-01",
    status: "Paid",
  },
  {
    $id: "bhqecj4p",
    clientName: "Carmella Garcia",
    clientEmail: "carmella@example.com",
    totalAmount: 721,
    dueDate: "2023-11-10",
    status: "Unpaid",
  },
];

export type Invoice = {
  $id: string;
  clientName: string;
  clientEmail: string;
  totalAmount: number;
  dueDate: string;
  status: "Paid" | "Unpaid";
};

interface DataTableProps {
  invoiceData?: Invoice[];
  getColumns: (
    updateInvoice?: (id: string, update: object) => void,
    deleteInvoice?: (id: string) => void,
    createMonthlyVATSummary?: (invoice: any) => object
  ) => ColumnDef<Invoice>[];
}

export const exactMatchFilter: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: any
) => {
  const value = row.getValue(columnId);

  return value === filterValue;
};

export function getDefaultColumns(
  updateInvoice: (id: string, update: object) => void,
  deleteInvoice: (id: string) => void,
  createMonthlyVATSummary: (invoice: any) => object
): ColumnDef<Invoice>[] {
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
      accessorKey: "clientName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.getValue("clientName")}</div>
      ),
    },
    {
      accessorKey: "clientEmail",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3 lowercase">{row.getValue("clientEmail")}</div>
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Amount
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="ml-3 font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className={`ml-3 px-3 py-2 w-fit rounded-sm font-semibold capitalize ${
            row.getValue("status") == "Paid" ? "bg-paid-bg text-paid-color" : ""
          } ${
            row.getValue("status") == "Unpaid"
              ? "bg-unpaid-bg text-unpaid-color"
              : ""
          } `}
        >
          {row.getValue("status")}
        </div>
      ),
      filterFn: exactMatchFilter,
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const dueDate = new Date(row.getValue("dueDate"));
        const formatted = dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return <div className="ml-3">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const invoice = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => updateInvoice(invoice.$id, {status: "Paid"}).then(() => {createMonthlyVATSummary(invoice); toast.success("Invoice marked as paid")}).catch(() => toast.error("Failed to update invoice"))}
              >
                Mark as paid
              </DropdownMenuItem>
              <InvoiceFormModal mode='edit' initialData={invoice} trigger={<span className="focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">Edit Invoice</span>} />
              <DropdownMenuItem
                onClick={() => deleteInvoice(invoice.$id).then(() => toast.success("Invoice deleted")).catch(() => toast.error("Failed to delete invoice"))}
              >
                Delete invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function DataTable({ invoiceData = defaultData, getColumns = getDefaultColumns  }: DataTableProps) {
  const { updateInvoice, deleteInvoice, createMonthlyVATSummary } = useDatabaseStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = getColumns(updateInvoice, deleteInvoice, createMonthlyVATSummary)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: invoiceData,
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

  const statusColumn = table.getColumn("status");
  const filterValue = statusColumn?.getFilterValue() as string | undefined;

  return (
    <div className="w-full px-4 lg:px-6">
      <div className="flex items-center justify- gap-8 py-4">
        <Input
          placeholder="Search Client Name..."
          value={
            (table.getColumn("clientName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("clientName")?.setFilterValue(event.target.value)
          }
          className="max-w-xs md:max-w-sm"
        />
        <InvoiceFormModal mode='create' trigger={<Button className="ml-auto text-foreground">Create Invoice</Button>} />
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
