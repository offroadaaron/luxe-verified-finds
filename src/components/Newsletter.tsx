
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-16 bg-secondary dark:bg-luxe-black">
      <div className="luxe-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-medium mb-4">Join Our VIP List</h2>
          <p className="text-muted-foreground mb-8">
            Be the first to know about new arrivals, exclusive offers, and upcoming auctions for rare luxury finds.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow py-6 bg-background border-luxe-gold/30 focus:border-luxe-gold"
              required
            />
            <Button type="submit" className="bg-luxe-gold hover:bg-luxe-gold/90 text-black">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Luxe Verified.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
