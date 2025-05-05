import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const mockCustomers = [
  { id: "c1", name: "Jane Doe", email: "jane@example.com", joined: "2024-01-10", status: "Active", orders: 3 },
  { id: "c2", name: "John Smith", email: "john@example.com", joined: "2024-02-14", status: "Inactive", orders: 1 },
  { id: "c3", name: "Emily Lee", email: "emily@example.com", joined: "2024-03-22", status: "Active", orders: 5 },
  { id: "c4", name: "Sam Lee", email: "sam@example.com", joined: "2024-04-01", status: "Active", orders: 2 },
  { id: "c5", name: "Alex Kim", email: "alex@example.com", joined: "2024-04-12", status: "Inactive", orders: 0 },
];

const statusOptions = ["All", "Active", "Inactive"];

const AdminCustomersPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [customers, setCustomers] = useState(mockCustomers);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || c.status === status;
    return matchesSearch && matchesStatus;
  });

  const deactivateCustomer = (id: string) => {
    setCustomers(cs => cs.map(c => c.id === id ? { ...c, status: "Inactive" } : c));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No customers found.</TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.joined}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>{c.orders}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View</Button>{" "}
                  <Button size="sm" variant="destructive" disabled={c.status === "Inactive"} onClick={() => deactivateCustomer(c.id)}>
                    Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminCustomersPage;
