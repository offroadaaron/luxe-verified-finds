
import React from 'react';
import { CheckCircle, Search, Award, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: 'Expert Assessment',
    description: 'Every item is meticulously examined by our team of luxury specialists with decades of experience.'
  },
  {
    icon: Shield,
    title: 'AI Verification',
    description: 'Computer vision analyzes high-resolution images to detect microscopic details of genuine products.'
  },
  {
    icon: Award,
    title: 'Digital Certificate',
    description: 'Each verified item receives a unique digital certificate with QR code for authenticity tracking.'
  },
  {
    icon: CheckCircle,
    title: '100% Guarantee',
    description: 'Our authentication process is backed by a full money-back guarantee for complete peace of mind.'
  }
];

const AuthenticationProcess = () => {
  return (
    <section className="py-16 bg-white dark:bg-luxe-darkgray">
      <div className="luxe-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-medium mb-4">Our Authentication Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We employ a rigorous multi-step verification process to ensure every item on our platform is 100% authentic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-luxe-gold/10 flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-luxe-gold" />
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/about">
            <Button className="bg-black hover:bg-black/90 text-white font-medium px-8 py-6 h-auto">
              Learn More About Our Process
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationProcess;
