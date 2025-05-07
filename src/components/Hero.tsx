
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getHomepageSettings } from '@/services/settingsService';

// Default configuration
const defaultConfig = {
  heroImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  heading: "Timeless Luxury, Verified Authenticity",
  subheading: "Discover handpicked, authenticated luxury pieces from the world's most prestigious brands."
};

const Hero = () => {
  // Fetch settings from the database
  const { data: settings, isLoading } = useQuery({
    queryKey: ['homepageSettings'],
    queryFn: getHomepageSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Use settings from database or fallback to defaults
  const heroImage = settings?.homepageImages?.heroImage || defaultConfig.heroImage;
  const heading = settings?.heroText?.heading || defaultConfig.heading;
  const subheading = settings?.heroText?.subheading || defaultConfig.subheading;

  return (
    <div className="relative bg-luxe-charcoal text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url('${heroImage}')` }} 
      />
      <div className="relative luxe-container py-24 md:py-32">
        <div className="max-w-lg animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {heading.split('Verified').map((part, i, arr) => 
              i === arr.length - 1 
                ? <React.Fragment key={i}>{part}</React.Fragment> 
                : <React.Fragment key={i}>{part}<span className="text-luxe-gold">Verified</span></React.Fragment>
            )}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {subheading}
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
