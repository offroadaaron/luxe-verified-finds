
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      toast.success("Login successful");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(email, password);
      toast.success("Signup successful! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-luxe-darkgray p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium">
              <span className="text-luxe-gold">Luxe</span>
              <span className="dark:text-white">Verified</span>
            </h1>
            <h2 className="mt-2 text-center text-xl font-medium">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="mt-6 space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="login-email" className="block text-sm font-medium mb-1">
                    Email address
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="login-password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
                
                <div className="text-sm text-center">
                  <a href="#" className="text-luxe-gold hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form className="mt-6 space-y-6" onSubmit={handleSignup}>
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium mb-1">
                    Email address
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="signup-password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    Password must be at least 6 characters long
                  </p>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
