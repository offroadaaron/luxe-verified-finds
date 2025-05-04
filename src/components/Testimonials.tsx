
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Thompson',
    role: 'Luxury Collector',
    content: 'I've purchased several vintage watches through Luxe Verified and the authentication process gives me complete confidence. The condition descriptions are spot-on.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Fashion Enthusiast',
    content: 'Found my dream Birkin for a fraction of retail price. The digital certificate and packaging made it feel like I was buying directly from the brand.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    role: 'Style Consultant',
    content: 'As someone who works in the fashion industry, I appreciate Luxe Verified's attention to detail and the depth of information provided about each item's provenance.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-luxe-charcoal text-white">
      <div className="luxe-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-medium mb-4">What Our Clients Say</h2>
          <div className="w-20 h-0.5 bg-luxe-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-luxe-gold text-luxe-gold" />
                ))}
              </div>
              <p className="mb-6 text-gray-300 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
