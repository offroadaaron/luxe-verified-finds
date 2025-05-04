
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Handbags',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/categories/handbags'
  },
  {
    id: 2,
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1589277471700-6c47e76184b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/categories/watches'
  },
  {
    id: 3,
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    link: '/categories/jewelry'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white dark:bg-luxe-darkgray">
      <div className="luxe-container">
        <h2 className="text-3xl font-serif font-medium mb-12 text-center">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id}
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="aspect-[4/5]">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="w-full">
                  <h3 className="text-xl font-serif font-medium text-white mb-2">{category.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">View Collection</span>
                    <span className="h-px flex-1 bg-white/40 mx-4"></span>
                    <span className="w-8 h-8 rounded-full bg-luxe-gold flex items-center justify-center text-black">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
