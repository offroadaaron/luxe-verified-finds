
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Birkin 30 Togo Leather Bag',
    brand: 'Hermès',
    price: 18500,
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags'
  },
  {
    id: '2',
    name: 'Submariner Date 41mm',
    brand: 'Rolex',
    price: 15750,
    originalPrice: 17800,
    images: ['https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches'
  },
  {
    id: '3',
    name: 'Double G Marmont Bag',
    brand: 'Gucci',
    price: 2350,
    originalPrice: 2980,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Handbags'
  },
  {
    id: '4',
    name: 'Love Bracelet Yellow Gold',
    brand: 'Cartier',
    price: 6450,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Jewelry'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-secondary dark:bg-luxe-black">
      <div className="luxe-container">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
          <h2 className="text-3xl font-serif font-medium">Featured Pieces</h2>
          <Link to="/products" className="group flex items-center text-sm font-medium text-luxe-gold mt-4 md:mt-0">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            className="bg-luxe-gold hover:bg-luxe-gold/90 text-black px-8 py-6" 
            asChild
          >
            <Link to="/products">
              Explore All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
