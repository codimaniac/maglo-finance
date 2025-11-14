"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useDatabaseStore } from "@/store/useDatabaseStore"

export const description = "A pie chart with a legend"

const chartConfig = {
  invoices: {
    label: "Invoices",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-1)",
  },
  unpaid: {
    label: "Unpaid",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartPieLegend() {
    const { getTotals } = useDatabaseStore()
    const totals = getTotals()
    const totalNoOfPaidInvoices = totals.noOfPaidInvoices || 0
    const totalNoOfUnpaidInvoices = totals.noOfUnpaidInvoices || 0
    
    const chartData = [
    { status: "paid", invoices: totalNoOfPaidInvoices, fill: "var(--color-paid)" },
    { status: "unpaid", invoices: totalNoOfUnpaidInvoices, fill: "var(--color-unpaid)" },
    ]

    console.log('Totals in ChartPieLegend:', totals)
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Paid vs Unpaid</CardTitle>
        <CardDescription>July - December 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false}/>
            <Pie data={chartData} dataKey="invoices" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
