
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Interface for hero configuration
interface HeroConfig {
  heroImage: string;
  heading: string;
  subheading: string;
}

// Default configuration
const defaultConfig: HeroConfig = {
  heroImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  heading: "Timeless Luxury, Verified Authenticity",
  subheading: "Discover handpicked, authenticated luxury pieces from the world's most prestigious brands."
};

const Hero = () => {
  const [config, setConfig] = useState<HeroConfig>(defaultConfig);
  
  // In a real app, we would fetch this from an API or context
  // For now, we'll check localStorage to simulate admin updates
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.homepageImages?.heroImage) {
          setConfig({
            heroImage: parsedSettings.homepageImages.heroImage,
            heading: parsedSettings.heroText?.heading || defaultConfig.heading,
            subheading: parsedSettings.heroText?.subheading || defaultConfig.subheading
          });
        }
      } catch (e) {
        console.error("Error parsing saved settings", e);
      }
    }
  }, []);

  return (
    <div className="relative bg-luxe-charcoal text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30" 
        style={{ backgroundImage: `url('${config.heroImage}')` }} 
      />
      <div className="relative luxe-container py-24 md:py-32">
        <div className="max-w-lg animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {config.heading.split('Verified').map((part, i, arr) => 
              i === arr.length - 1 
                ? <>{part}</> 
                : <>{part}<span className="text-luxe-gold">Verified</span></>
            )}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {config.subheading}
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
