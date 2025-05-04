
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import AuthenticationProcess from '@/components/AuthenticationProcess';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <Hero />
        <FeaturedCategories />
        <FeaturedProducts />
        <AuthenticationProcess />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
