
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Trash2
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

// Mock products data
const products = [
  {
    id: '1',
    name: 'Birkin 30 Togo Leather Bag',
    brand: 'Hermès',
    price: 18500,
    category: 'Handbags',
    status: 'Listed',
    authenticated: true,
    createdAt: '2023-05-15',
  },
  {
    id: '2',
    name: 'Submariner Date 41mm',
    brand: 'Rolex',
    price: 15750,
    category: 'Watches',
    status: 'Listed',
    authenticated: true,
    createdAt: '2023-05-14',
  },
  {
    id: '3',
    name: 'Double G Marmont Bag',
    brand: 'Gucci',
    price: 2350,
    category: 'Handbags',
    status: 'Listed',
    authenticated: true,
    createdAt: '2023-05-13',
  },
  {
    id: '4',
    name: 'Love Bracelet Yellow Gold',
    brand: 'Cartier',
    price: 6450,
    category: 'Jewelry',
    status: 'Pending Authentication',
    authenticated: false,
    createdAt: '2023-05-12',
  },
  {
    id: '5',
    name: 'Classic Flap Bag Medium',
    brand: 'Chanel',
    price: 7500,
    category: 'Handbags',
    status: 'Listed',
    authenticated: true,
    createdAt: '2023-05-11',
  },
];

const AdminDashboard = () => {
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
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-luxe-charcoal text-white z-10">
          <div className="flex items-center h-16 px-6 border-b border-white/10">
            <h1 className="text-xl font-serif font-bold">
              <span className="text-luxe-gold">Luxe</span>
              <span className="text-white">Admin</span>
            </h1>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="px-4 py-6">
              <nav className="space-y-1">
                <Link to="/admin" className="flex items-center px-3 py-2 text-white bg-white/10 rounded-sm">
                  <Package className="h-5 w-5 mr-3" />
                  Products
                </Link>
                <Link to="/admin/orders" className="flex items-center px-3 py-2 text-gray-300 hover:bg-white/10 rounded-sm">
                  <CreditCard className="h-5 w-5 mr-3" />
                  Orders
                </Link>
                <Link to="/admin/customers" className="flex items-center px-3 py-2 text-gray-300 hover:bg-white/10 rounded-sm">
                  <Users className="h-5 w-5 mr-3" />
                  Customers
                </Link>
                <Link to="/admin/settings" className="flex items-center px-3 py-2 text-gray-300 hover:bg-white/10 rounded-sm">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-luxe-gold text-black flex items-center justify-center font-medium">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@luxeverified.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Top Navigation */}
          <div className="sticky top-0 z-10 bg-background border-b border-border">
            <div className="flex justify-between items-center h-16 px-6">
              <h2 className="text-xl font-medium">Products</h2>
              <div className="flex items-center space-x-4">
                <button className="text-muted-foreground hover:text-foreground">
                  <Search className="h-5 w-5" />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Filter className="h-5 w-5" />
                </button>
                <Button className="bg-luxe-gold hover:bg-luxe-gold/90 text-black">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add New Product
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <Tabs defaultValue="all">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="listed">Listed</TabsTrigger>
                  <TabsTrigger value="pending">Pending Authentication</TabsTrigger>
                  <TabsTrigger value="sold">Sold</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center space-x-2">
                  <Input 
                    type="text"
                    placeholder="Search products..."
                    className="w-64 border-luxe-gold/30"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-luxe-gold/30">
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
                <div className="bg-card rounded-sm shadow">
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
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date Added</TableHead>
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
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.status === 'Listed' ? 'default' : 'outline'} 
                              className={product.status === 'Listed' ? 'bg-green-500' : ''}
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${product.price.toLocaleString()}</TableCell>
                          <TableCell>{product.createdAt}</TableCell>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
