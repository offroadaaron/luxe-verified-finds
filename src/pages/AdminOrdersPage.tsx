
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";
import { useIsMobile } from "@/hooks/use-mobile";

const mockOrders = [
  { id: "1001", customer: "Jane Doe", product: "Birkin 30 Togo Leather Bag", total: 18500, status: "Shipped", date: "2024-04-01" },
  { id: "1002", customer: "John Smith", product: "Submariner Date 41mm", total: 15750, status: "Processing", date: "2024-04-03" },
  { id: "1003", customer: "Emily Lee", product: "Double G Marmont Bag", total: 2350, status: "Delivered", date: "2024-04-04" },
  { id: "1004", customer: "Sam Lee", product: "Classic Flap Bag Medium", total: 7500, status: "Cancelled", date: "2024-04-05" },
  { id: "1005", customer: "Alex Kim", product: "Love Bracelet Yellow Gold", total: 6450, status: "Shipped", date: "2024-04-06" },
  { id: "1006", customer: "Chris Park", product: "Classic Flap Bag Medium", total: 7500, status: "Processing", date: "2024-04-07" },
];

const statusOptions = ["All", "Shipped", "Processing", "Delivered", "Cancelled"];

const AdminOrdersPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const isMobile = useIsMobile();

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.id.includes(search) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || order.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Orders</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-6 items-start md:items-center">
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-64"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border rounded px-2 py-1 w-full md:w-auto"
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <div className={isMobile ? "min-w-[600px]" : ""}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No orders found.</TableCell>
                </TableRow>
              ) : (
                filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                    <TableCell>${order.total.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
