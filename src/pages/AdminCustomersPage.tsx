
import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Eye, Heart, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Enhanced mock customer data with recent views and wishlist
const mockCustomers = [
  { 
    id: "c1", 
    name: "Jane Doe", 
    email: "jane@example.com", 
    joined: "2024-01-10", 
    status: "Active", 
    orders: 3,
    recentViews: [
      { id: "p1", name: "Birkin 30 Togo Leather Bag", brand: "Hermès", timestamp: "2024-05-03T14:22:00Z" },
      { id: "p2", name: "Submariner Date 41mm", brand: "Rolex", timestamp: "2024-05-02T09:15:00Z" }
    ],
    wishlist: [
      { id: "p1", name: "Birkin 30 Togo Leather Bag", brand: "Hermès", dateAdded: "2024-04-29T11:30:00Z" }
    ]
  },
  { 
    id: "c2", 
    name: "John Smith", 
    email: "john@example.com", 
    joined: "2024-02-14", 
    status: "Inactive", 
    orders: 1,
    recentViews: [
      { id: "p3", name: "Double G Marmont Bag", brand: "Gucci", timestamp: "2024-05-01T16:44:00Z" }
    ],
    wishlist: []
  },
  { 
    id: "c3", 
    name: "Emily Lee", 
    email: "emily@example.com", 
    joined: "2024-03-22", 
    status: "Active", 
    orders: 5,
    recentViews: [
      { id: "p4", name: "Love Bracelet Yellow Gold", brand: "Cartier", timestamp: "2024-05-04T10:12:00Z" },
      { id: "p5", name: "Classic Flap Bag Medium", brand: "Chanel", timestamp: "2024-05-04T10:18:00Z" },
      { id: "p1", name: "Birkin 30 Togo Leather Bag", brand: "Hermès", timestamp: "2024-05-01T15:30:00Z" }
    ],
    wishlist: [
      { id: "p4", name: "Love Bracelet Yellow Gold", brand: "Cartier", dateAdded: "2024-04-15T09:22:00Z" },
      { id: "p5", name: "Classic Flap Bag Medium", brand: "Chanel", dateAdded: "2024-04-20T14:10:00Z" }
    ]
  },
  { 
    id: "c4", 
    name: "Sam Lee", 
    email: "sam@example.com", 
    joined: "2024-04-01", 
    status: "Active", 
    orders: 2,
    recentViews: [],
    wishlist: [
      { id: "p6", name: "Royal Oak Chronograph 41mm", brand: "Audemars Piguet", dateAdded: "2024-05-01T08:45:00Z" }
    ]
  },
  { 
    id: "c5", 
    name: "Alex Kim", 
    email: "alex@example.com", 
    joined: "2024-04-12", 
    status: "Inactive", 
    orders: 0,
    recentViews: [],
    wishlist: []
  },
];

const statusOptions = ["All", "Active", "Inactive"];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const AdminCustomersPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || c.status === status;
    return matchesSearch && matchesStatus;
  });

  const deactivateCustomer = (id) => {
    setCustomers(cs => cs.map(c => c.id === id ? { ...c, status: "Inactive" } : c));
  };

  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
  };

  const closeCustomerDetails = () => {
    setSelectedCustomer(null);
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
      
      {selectedCustomer ? (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
            <Button variant="ghost" size="sm" onClick={closeCustomerDetails}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p>{selectedCustomer.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Joined</p>
              <p>{formatDate(selectedCustomer.joined)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p>{selectedCustomer.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Orders</p>
              <p>{selectedCustomer.orders}</p>
            </div>
          </div>
          
          <Tabs defaultValue="recent-views">
            <TabsList className="mb-4">
              <TabsTrigger value="recent-views">Recent Views</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent-views">
              <h3 className="text-lg font-medium mb-3">Recently Viewed Products</h3>
              {selectedCustomer.recentViews.length === 0 ? (
                <p className="text-muted-foreground">No recent product views.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Viewed On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCustomer.recentViews.map(item => (
                      <TableRow key={`${item.id}-${item.timestamp}`}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{formatDateTime(item.timestamp)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
            
            <TabsContent value="wishlist">
              <h3 className="text-lg font-medium mb-3">Wishlist Items</h3>
              {selectedCustomer.wishlist.length === 0 ? (
                <p className="text-muted-foreground">No items in wishlist.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Added On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCustomer.wishlist.map(item => (
                      <TableRow key={`${item.id}-wishlist`}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{formatDateTime(item.dateAdded)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No customers found.</TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{formatDate(c.joined)}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>{c.orders}</TableCell>
                  <TableCell>
                    <div className="flex space-x-3">
                      <div className="flex items-center" title="Recent Views">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{c.recentViews.length}</span>
                      </div>
                      <div className="flex items-center" title="Wishlist Items">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{c.wishlist.length}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="mr-2" onClick={() => handleViewCustomerDetails(c)}>View</Button>
                    <Button size="sm" variant="destructive" disabled={c.status === "Inactive"} onClick={() => deactivateCustomer(c.id)}>
                      Deactivate
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default AdminCustomersPage;
