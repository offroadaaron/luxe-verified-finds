
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, ShoppingCart, Users, Settings, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const menu = [
  { label: "Dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, to: "/admin" },
  { label: "Orders", icon: <ShoppingCart className="mr-2 h-4 w-4" />, to: "/admin/orders" },
  { label: "Customers", icon: <Users className="mr-2 h-4 w-4" />, to: "/admin/customers" },
  { label: "Settings", icon: <Settings className="mr-2 h-4 w-4" />, to: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      )}
      
      {/* Sidebar for desktop and conditional for mobile */}
      <aside 
        className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-64'
        } bg-white dark:bg-gray-900 border-r p-6 flex flex-col`}
      >
        <div className="mb-8">
          <span className="text-2xl font-bold text-luxe-gold">Luxe Admin</span>
        </div>
        <nav className="flex-1">
          {menu.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-3 py-2 mb-2 rounded transition-colors font-medium ${location.pathname === item.to ? "bg-luxe-gold text-black" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
              onClick={isMobile ? () => setSidebarOpen(false) : undefined}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <Button onClick={handleLogout} variant="outline" className="mt-8 flex items-center">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </aside>
      
      {/* Semi-transparent overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Main content area */}
      <main className={`flex-1 p-4 md:p-8 overflow-y-auto ${isMobile ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
