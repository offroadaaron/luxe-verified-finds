
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-luxe-charcoal text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594408055262-e64789615bef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30" />
      <div className="relative luxe-container py-24 md:py-32">
        <div className="max-w-lg animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Timeless Luxury, <span className="text-luxe-gold">Verified</span> Authenticity
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Discover handpicked, authenticated luxury pieces from the world's most prestigious brands.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-luxe-gold hover:bg-luxe-gold/90 text-black px-8 py-6" 
              asChild
            >
              <Link to="/products">
                Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white hover:bg-white/10 text-white px-8 py-6"
              asChild
            >
              <Link to="/about">
                Our Authentication Process
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
