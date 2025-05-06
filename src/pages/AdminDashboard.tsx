import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Users,
  CreditCard,
  Settings,
  PlusCircle,
  FileText,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  BarChart2,
  ShoppingCart,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from "@/components/AdminLayout";
import { useIsMobile } from "@/hooks/useIsMobile";

// Mock products data
const products = [
  { id: '1', name: 'Birkin 30 Togo Leather Bag', brand: 'Hermès', price: 18500, cost: 12000, category: 'Handbags', status: 'Listed', authenticated: true, createdAt: '2023-05-15' },
  { id: '2', name: 'Submariner Date 41mm', brand: 'Rolex', price: 15750, cost: 11000, category: 'Watches', status: 'Listed', authenticated: true, createdAt: '2023-05-14' },
  { id: '3', name: 'Double G Marmont Bag', brand: 'Gucci', price: 2350, cost: 1500, category: 'Handbags', status: 'Listed', authenticated: true, createdAt: '2023-05-13' },
  { id: '4', name: 'Love Bracelet Yellow Gold', brand: 'Cartier', price: 6450, cost: 4200, category: 'Jewelry', status: 'Listed', authenticated: true, createdAt: '2023-05-12' },
  { id: '5', name: 'Classic Flap Bag Medium', brand: 'Chanel', price: 7500, cost: 5000, category: 'Handbags', status: 'Listed', authenticated: true, createdAt: '2023-05-11' },
];

// Add mock orders for reporting
const orders = [
  { id: '1001', customer: 'Jane Doe', customerId: 'c1', product: 'Birkin 30 Togo Leather Bag', productId: '1', total: 18500, status: 'Shipped', date: '2024-04-01' },
  { id: '1002', customer: 'John Smith', customerId: 'c2', product: 'Submariner Date 41mm', productId: '2', total: 15750, status: 'Processing', date: '2024-04-03' },
  { id: '1003', customer: 'Emily Lee', customerId: 'c3', product: 'Double G Marmont Bag', productId: '3', total: 2350, status: 'Delivered', date: '2024-04-04' },
  { id: '1004', customer: 'Sam Lee', customerId: 'c4', product: 'Classic Flap Bag Medium', productId: '5', total: 7500, status: 'Cancelled', date: '2024-04-05' },
  { id: '1005', customer: 'Alex Kim', customerId: 'c5', product: 'Love Bracelet Yellow Gold', productId: '4', total: 6450, status: 'Shipped', date: '2024-04-06' },
  { id: '1006', customer: 'Chris Park', customerId: 'c6', product: 'Classic Flap Bag Medium', productId: '5', total: 7500, status: 'Processing', date: '2024-04-07' },
  { id: '1007', customer: 'Jane Doe', customerId: 'c1', product: 'Classic Flap Bag Medium', productId: '5', total: 7500, status: 'Delivered', date: '2024-04-08' },
  { id: '1008', customer: 'Emily Lee', customerId: 'c3', product: 'Birkin 30 Togo Leather Bag', productId: '1', total: 18500, status: 'Shipped', date: '2024-04-09' },
];

// Mock customers for reporting
const customers = [
  { id: 'c1', name: 'Jane Doe', email: 'jane@example.com' },
  { id: 'c2', name: 'John Smith', email: 'john@example.com' },
  { id: 'c3', name: 'Emily Lee', email: 'emily@example.com' },
  { id: 'c4', name: 'Sam Lee', email: 'sam@example.com' },
  { id: 'c5', name: 'Alex Kim', email: 'alex@example.com' },
  { id: 'c6', name: 'Chris Park', email: 'chris@example.com' },
];

// ROI Calculation
const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
const totalCost = orders.reduce((sum, o) => {
  const product = products.find(p => p.id === o.productId);
  return sum + (product ? product.cost : 0);
}, 0);
const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

// Customer Return Rate
const customerOrderCounts = orders.reduce((acc, o) => {
  acc[o.customerId] = (acc[o.customerId] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const repeatCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
const customerReturnRate = customers.length > 0 ? (repeatCustomers / customers.length) * 100 : 0;

// Top Customers
const topCustomers = customers.map(c => {
  const ordersForCustomer = orders.filter(o => o.customerId === c.id);
  const totalSpent = ordersForCustomer.reduce((sum, o) => sum + o.total, 0);
  return { ...c, orders: ordersForCustomer.length, totalSpent };
}).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 3);

// Average Order Value
const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

// Best Selling Product
const productOrderCounts = orders.reduce((acc, o) => {
  acc[o.productId] = (acc[o.productId] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const bestSellingProductId = Object.keys(productOrderCounts).reduce((a, b) => productOrderCounts[a] > productOrderCounts[b] ? a : b, '');
const bestSellingProduct = products.find(p => p.id === bestSellingProductId);

// Order Status Breakdown
const orderStatusCounts = orders.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// Monthly Sales Trend (last 6 months, mock)
const monthlySales = [
  { month: '2023-11', total: 8000 },
  { month: '2023-12', total: 12000 },
  { month: '2024-01', total: 15000 },
  { month: '2024-02', total: 10000 },
  { month: '2024-03', total: 17000 },
  { month: '2024-04', total: 22000 },
];

// --- Conversion Rate ---
const uniqueVisitors = 1200; // Mock: unique visitors in the period
const conversionRate = uniqueVisitors > 0 ? (orders.length / uniqueVisitors) * 100 : 0;

// --- Inventory Turnover ---
// COGS: Cost of sold products (exclude cancelled orders)
const soldOrders = orders.filter(o => o.status !== 'Cancelled');
const cogs = soldOrders.reduce((sum, o) => {
  const product = products.find(p => p.id === o.productId);
  return sum + (product ? product.cost : 0);
}, 0);
// Mock: Average inventory value
const averageInventory = 30000;
const inventoryTurnover = averageInventory > 0 ? cogs / averageInventory : 0;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem("isAdmin") === "true";
  const isMobile = useIsMobile(); // Add this hook
  
  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const handleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <AdminLayout>
      {/* Reporting Cards - now responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">ROI</span>
          <div className="text-xl md:text-2xl font-bold mb-1">{roi.toFixed(2)}%</div>
          <span className="text-xs text-muted-foreground">Revenue: ${totalRevenue.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Cost: ${totalCost.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">Customer Return Rate</span>
          <div className="text-xl md:text-2xl font-bold mb-1">{customerReturnRate.toFixed(1)}%</div>
          <span className="text-xs text-muted-foreground">Repeat: {repeatCustomers} / {customers.length}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">Conversion Rate</span>
          <div className="text-xl md:text-2xl font-bold mb-1">{conversionRate.toFixed(1)}%</div>
          <span className="text-xs text-muted-foreground">Orders: {orders.length} / Visitors: {uniqueVisitors}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">Inventory Turnover</span>
          <div className="text-xl md:text-2xl font-bold mb-1">{inventoryTurnover.toFixed(2)}</div>
          <span className="text-xs text-muted-foreground">COGS: ${cogs.toLocaleString()} / Avg Inv: ${averageInventory.toLocaleString()}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">Average Order Value</span>
          <div className="text-xl md:text-2xl font-bold mb-1">${averageOrderValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <span className="text-xs text-muted-foreground">Orders: {orders.length}</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex flex-col items-start">
          <span className="text-sm text-muted-foreground mb-1">Best Seller</span>
          <div className="text-sm md:text-lg font-bold mb-1">{bestSellingProduct ? bestSellingProduct.name : '-'}</div>
          <span className="text-xs text-muted-foreground">{bestSellingProduct ? productOrderCounts[bestSellingProduct.id] : 0} sold</span>
        </div>
      </div>
      
      {/* Top Customers & Order Status Breakdown - responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Top Customers</h3>
          <div className="min-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{c.email}</TableCell>
                    <TableCell>{c.orders}</TableCell>
                    <TableCell>${c.totalSpent.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Order Status Breakdown</h3>
          <ul className="space-y-2">
            {Object.entries(orderStatusCounts).map(([status, count]) => (
              <li key={status} className="flex justify-between">
                <span className="capitalize">{status}</span>
                <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Monthly Sales Trend - responsive */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow mb-8 overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">Monthly Sales Trend</h3>
        <div className="flex flex-row gap-3 md:gap-6 min-w-[500px]">
          {monthlySales.map(ms => (
            <div key={ms.month} className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">{ms.month}</span>
              <div className="h-16 w-6 md:w-8 bg-luxe-gold rounded-t flex items-end justify-center" style={{ height: `${ms.total/500}px` }}>
                <span className="text-xs text-black font-bold">${(ms.total/1000).toFixed(1)}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Orders Table - responsive */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/admin/orders"><Button variant="outline" size={isMobile ? "sm" : "default"}>View All</Button></Link>
        </div>
        <div className="min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 3).map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                  <TableCell>${order.total.toLocaleString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Products section - responsive */}
      <div className="p-4 md:p-6">
        <Tabs defaultValue="all">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <TabsList className="flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="listed">Listed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input 
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-64 border-luxe-gold/30"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto border-luxe-gold/30">
                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled={selectedProducts.length === 0}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled={selectedProducts.length === 0}>
                    <FileText className="mr-2 h-4 w-4" /> Export Selected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled={selectedProducts.length === 0} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            <div className="bg-card rounded-sm shadow overflow-x-auto">
              <div className="min-w-[800px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedProducts.length === products.length && products.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden md:table-cell">Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => handleSelectProduct(product.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-sm"></div>
                            <div className="font-medium">{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={product.status === 'Listed' ? 'default' : 'outline'} 
                            className={product.status === 'Listed' ? 'bg-green-500' : ''}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${product.price.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{product.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Product</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1-5</strong> of <strong>12</strong> products
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-luxe-gold/30" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="border-luxe-gold/30">
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="listed">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Listed products will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Products pending authentication will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="sold">
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Sold products will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
