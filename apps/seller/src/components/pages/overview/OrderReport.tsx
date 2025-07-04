'use client';

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/components/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { Button, buttonVariants } from '@repo/ui/components/button';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import { truncate } from '@repo/ui/utils/truncate';

const chartData = [
  { date: '2024-04-01', completed: 222, cancelled: 50 },
  { date: '2024-04-02', completed: 97, cancelled: 30 },
  { date: '2024-04-03', completed: 167, cancelled: 40 },
  { date: '2024-04-04', completed: 242, cancelled: 60 },
  { date: '2024-04-05', completed: 373, cancelled: 70 },
  { date: '2024-04-06', completed: 301, cancelled: 80 },
  { date: '2024-04-07', completed: 245, cancelled: 45 },
  { date: '2024-04-08', completed: 409, cancelled: 90 },
  { date: '2024-04-09', completed: 59, cancelled: 15 },
  { date: '2024-04-10', completed: 261, cancelled: 55 },
  { date: '2024-04-11', completed: 327, cancelled: 75 },
  { date: '2024-04-12', completed: 292, cancelled: 65 },
  { date: '2024-04-13', completed: 342, cancelled: 85 },
  { date: '2024-04-14', completed: 137, cancelled: 35 },
  { date: '2024-04-15', completed: 120, cancelled: 30 },
  { date: '2024-04-16', completed: 138, cancelled: 40 },
  { date: '2024-04-17', completed: 446, cancelled: 95 },
  { date: '2024-04-18', completed: 364, cancelled: 80 },
  { date: '2024-04-19', completed: 243, cancelled: 60 },
  { date: '2024-04-20', completed: 89, cancelled: 25 },
  { date: '2024-04-21', completed: 137, cancelled: 35 },
  { date: '2024-04-22', completed: 224, cancelled: 55 },
  { date: '2024-04-23', completed: 138, cancelled: 40 },
  { date: '2024-04-24', completed: 387, cancelled: 85 },
  { date: '2024-04-25', completed: 215, cancelled: 50 },
  { date: '2024-04-26', completed: 75, cancelled: 20 },
  { date: '2024-04-27', completed: 383, cancelled: 90 },
  { date: '2024-04-28', completed: 122, cancelled: 35 },
  { date: '2024-04-29', completed: 315, cancelled: 70 },
  { date: '2024-04-30', completed: 454, cancelled: 95 },
  { date: '2024-05-01', completed: 165, cancelled: 45 },
  { date: '2024-05-02', completed: 293, cancelled: 65 },
  { date: '2024-05-03', completed: 247, cancelled: 55 },
  { date: '2024-05-04', completed: 385, cancelled: 85 },
  { date: '2024-05-05', completed: 481, cancelled: 100 },
  { date: '2024-05-06', completed: 498, cancelled: 110 },
  { date: '2024-05-07', completed: 388, cancelled: 85 },
  { date: '2024-05-08', completed: 149, cancelled: 40 },
  { date: '2024-05-09', completed: 227, cancelled: 50 },
  { date: '2024-05-10', completed: 293, cancelled: 70 },
  { date: '2024-05-11', completed: 335, cancelled: 75 },
  { date: '2024-05-12', completed: 197, cancelled: 45 },
  { date: '2024-05-13', completed: 197, cancelled: 40 },
  { date: '2024-05-14', completed: 448, cancelled: 95 },
  { date: '2024-05-15', completed: 473, cancelled: 100 },
  { date: '2024-05-16', completed: 338, cancelled: 80 },
  { date: '2024-05-17', completed: 499, cancelled: 110 },
  { date: '2024-05-18', completed: 315, cancelled: 70 },
  { date: '2024-05-19', completed: 235, cancelled: 55 },
  { date: '2024-05-20', completed: 177, cancelled: 45 },
  { date: '2024-05-21', completed: 82, cancelled: 20 },
  { date: '2024-05-22', completed: 81, cancelled: 15 },
  { date: '2024-05-23', completed: 252, cancelled: 60 },
  { date: '2024-05-24', completed: 294, cancelled: 65 },
  { date: '2024-05-25', completed: 201, cancelled: 50 },
  { date: '2024-05-26', completed: 213, cancelled: 45 },
  { date: '2024-05-27', completed: 420, cancelled: 95 },
  { date: '2024-05-28', completed: 233, cancelled: 55 },
  { date: '2024-05-29', completed: 78, cancelled: 20 },
  { date: '2024-05-30', completed: 340, cancelled: 75 },
  { date: '2024-05-31', completed: 178, cancelled: 45 },
  { date: '2024-06-01', completed: 178, cancelled: 40 },
  { date: '2024-06-02', completed: 470, cancelled: 100 },
  { date: '2024-06-03', completed: 103, cancelled: 25 },
  { date: '2024-06-04', completed: 439, cancelled: 95 },
  { date: '2024-06-05', completed: 88, cancelled: 20 },
  { date: '2024-06-06', completed: 294, cancelled: 65 },
  { date: '2024-06-07', completed: 323, cancelled: 75 },
  { date: '2024-06-08', completed: 385, cancelled: 85 },
  { date: '2024-06-09', completed: 438, cancelled: 95 },
  { date: '2024-06-10', completed: 155, cancelled: 40 },
  { date: '2024-06-11', completed: 92, cancelled: 25 },
  { date: '2024-06-12', completed: 492, cancelled: 105 },
  { date: '2024-06-13', completed: 81, cancelled: 20 },
  { date: '2024-06-14', completed: 426, cancelled: 90 },
  { date: '2024-06-15', completed: 307, cancelled: 70 },
  { date: '2024-06-16', completed: 371, cancelled: 80 },
  { date: '2024-06-17', completed: 475, cancelled: 110 },
  { date: '2024-06-18', completed: 107, cancelled: 30 },
  { date: '2024-06-19', completed: 341, cancelled: 75 },
  { date: '2024-06-20', completed: 408, cancelled: 90 },
  { date: '2024-06-21', completed: 169, cancelled: 45 },
  { date: '2024-06-22', completed: 317, cancelled: 70 },
  { date: '2024-06-23', completed: 480, cancelled: 105 },
  { date: '2024-06-24', completed: 132, cancelled: 35 },
  { date: '2024-06-25', completed: 141, cancelled: 40 },
  { date: '2024-06-26', completed: 434, cancelled: 95 },
  { date: '2024-06-27', completed: 448, cancelled: 100 },
  { date: '2024-06-28', completed: 149, cancelled: 40 },
  { date: '2024-06-29', completed: 103, cancelled: 25 },
  { date: '2024-06-30', completed: 446, cancelled: 95 },
];

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  completed: {
    label: 'Completed',
    color: 'var(--chart-1)',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const orders = [
  {
    id: 'ORDER-001',
    customer: 'Robin Mind',
    product: 'Blocks Set',
    status: 'Pending',
    total: 45.0,
    tax: 3.15,
    createdAt: '2025-06-20',
  },
  {
    id: 'ORDER-002',
    customer: 'Amina Noor',
    product: 'Rat Stuffed Toy',
    status: 'Shipped',
    total: 32.99,
    tax: 2.31,
    createdAt: '2025-06-21',
  },
  {
    id: 'ORDER-003',
    customer: 'Sakib Khan',
    product: 'Coloring Book',
    status: 'Delivered',
    total: 12.5,
    tax: 0.88,
    createdAt: '2025-06-22',
  },
  {
    id: 'ORDER-004',
    customer: 'Ritu Akter',
    product: 'Wooden Puzzle',
    status: 'Cancelled',
    total: 18.75,
    tax: 1.31,
    createdAt: '2025-06-22',
  },
  {
    id: 'ORDER-005',
    customer: 'Jamil Hasan',
    product: 'Plush Elephant',
    status: 'Delivered',
    total: 28.0,
    tax: 1.96,
    createdAt: '2025-06-23',
  },
];

const OrderReport = () => {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <section>
      <div className="container">
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">
          <div className="h-full xl:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Order Analytics</CardTitle>
                <CardDescription>
                  Showing completed and cancelled orders for the last 3 months
                </CardDescription>
                <CardAction>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                      className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                      aria-label="Select a value"
                    >
                      <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="90d" className="rounded-lg">
                        Last 3 months
                      </SelectItem>
                      <SelectItem value="30d" className="rounded-lg">
                        Last 30 days
                      </SelectItem>
                      <SelectItem value="7d" className="rounded-lg">
                        Last 7 days
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardAction>
              </CardHeader>
              <CardContent className="h-full">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-64 w-full xl:h-full"
                >
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-completed)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-completed)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-cancelled)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-cancelled)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            });
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="cancelled"
                      type="natural"
                      fill="url(#fillMobile)"
                      stroke="var(--color-cancelled)"
                      stackId="a"
                    />
                    <Area
                      dataKey="completed"
                      type="natural"
                      fill="url(#fillDesktop)"
                      stroke="var(--color-completed)"
                      stackId="a"
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Insights</CardTitle>
                <CardAction>
                  <Link
                    className={cn(buttonVariants({ variant: 'link' }))}
                    href="/seller/dashboard/order/list"
                  >
                    All orders
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Table className="scroll-thin">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{truncate(order.customer, 15)}</TableCell>
                        <TableCell>{order.createdAt}</TableCell>
                        <TableCell align="right">
                          <Button size="sm">Acpect</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderReport;
