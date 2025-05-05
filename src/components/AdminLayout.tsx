import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, ShoppingCart, Users, Settings } from "lucide-react";

const menu = [
  { label: "Dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, to: "/admin" },
  { label: "Orders", icon: <ShoppingCart className="mr-2 h-4 w-4" />, to: "/admin/orders" },
  { label: "Customers", icon: <Users className="mr-2 h-4 w-4" />, to: "/admin/customers" },
  { label: "Settings", icon: <Settings className="mr-2 h-4 w-4" />, to: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r p-6 flex flex-col">
        <div className="mb-8">
          <span className="text-2xl font-bold text-luxe-gold">Luxe Admin</span>
        </div>
        <nav className="flex-1">
          {menu.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-3 py-2 mb-2 rounded transition-colors font-medium ${location.pathname === item.to ? "bg-luxe-gold text-black" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"}`}
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
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
