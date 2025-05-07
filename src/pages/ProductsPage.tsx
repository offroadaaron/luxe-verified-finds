
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductList from '@/components/products/ProductList';
import MobileFilterSheet from '@/components/products/MobileFilterSheet';
import DesktopFilters from '@/components/products/DesktopFilters';
import SortSelect from '@/components/products/SortSelect';
import { useProductFilters, productConstants } from '@/hooks/useProductFilters';
import { Product } from '@/components/ProductCard';

// Mock product data - in a real app this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Birkin 35',
    brand: 'Hermès',
    price: 15000,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '2',
    name: 'Datejust 36',
    brand: 'Rolex',
    price: 12000,
    originalPrice: 14500,
    images: ['https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1170&auto=format&fit=crop'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '3',
    name: 'Dionysus GG Supreme',
    brand: 'Gucci',
    price: 2500,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '4',
    name: 'Love Bracelet',
    brand: 'Cartier',
    price: 6800,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1096&auto=format&fit=crop'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Jewelry',
    gender: 'Womens'
  },
  {
    id: '5',
    name: 'Classic Flap Bag',
    brand: 'Chanel',
    price: 8500,
    originalPrice: 9000,
    images: ['https://images.unsplash.com/photo-1575032617751-6ddec2089882?q=80&w=1170&auto=format&fit=crop'],
    condition: 'Good',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '6',
    name: 'Royal Oak',
    brand: 'Audemars Piguet',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1623998021446-45cd9b714efd?q=80&w=1072&auto=format&fit=crop'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '7',
    name: 'B.Zero1 Ring',
    brand: 'Bvlgari',
    price: 2200,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1096&auto=format&fit=crop'],
    condition: 'Excellent',
    authenticated: false,
    category: 'Jewelry',
    gender: 'Womens'
  },
  {
    id: '8',
    name: 'Silk Scarf',
    brand: 'Hermès',
    price: 450,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1035&auto=format&fit=crop'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Accessories',
    gender: 'Womens'
  },
  {
    id: '9',
    name: 'Submariner',
    brand: 'Rolex',
    price: 15000,
    originalPrice: 16500,
    images: ['https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1170&auto=format&fit=crop'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '10',
    name: 'Princetown Mules',
    brand: 'Gucci',
    price: 850,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1169&auto=format&fit=crop'],
    condition: 'Good',
    authenticated: false,
    category: 'Accessories',
    gender: 'Womens'
  },
];

const ProductsPage = () => {
  const { brands, categories, conditions, genders } = productConstants;
  
  const {
    filters,
    setters,
    actions
  } = useProductFilters(mockProducts);
  
  const filteredProducts = actions.filterProducts();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="luxe-container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-serif font-medium">
            {filters.selectedCategory !== 'All Categories' 
              ? filters.selectedCategory 
              : filters.selectedGender !== 'All' 
                ? `${filters.selectedGender} Products` 
                : 'All Products'}
          </h1>
          
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <SortSelect 
              selectedSort={filters.selectedSort} 
              onValueChange={(val) => {
                setters.setSelectedSort(val);
                actions.applyFilters();
              }} 
            />
            
            <MobileFilterSheet
              selectedSort={filters.selectedSort}
              setSelectedSort={setters.setSelectedSort}
              selectedGender={filters.selectedGender}
              selectedCategory={filters.selectedCategory}
              selectedBrand={filters.selectedBrand}
              selectedCondition={filters.selectedCondition}
              verifiedOnly={filters.verifiedOnly}
              priceRange={filters.priceRange}
              updateFilter={actions.updateFilter}
              setPriceRange={setters.setPriceRange}
              setVerifiedOnly={setters.setVerifiedOnly}
              applyFilters={actions.applyFilters}
              resetFilters={actions.resetFilters}
              brands={brands}
              categories={categories}
              conditions={conditions}
              genders={genders}
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <DesktopFilters
            selectedGender={filters.selectedGender}
            selectedCategory={filters.selectedCategory}
            selectedBrand={filters.selectedBrand}
            selectedCondition={filters.selectedCondition}
            verifiedOnly={filters.verifiedOnly}
            priceRange={filters.priceRange}
            updateFilter={actions.updateFilter}
            setPriceRange={setters.setPriceRange}
            setVerifiedOnly={setters.setVerifiedOnly}
            applyFilters={actions.applyFilters}
            resetFilters={actions.resetFilters}
            brands={brands}
            categories={categories}
            conditions={conditions}
            genders={genders}
            brandSectionOpen={filters.brandSectionOpen}
            categorySectionOpen={filters.categorySectionOpen}
            conditionSectionOpen={filters.conditionSectionOpen}
            setBrandSectionOpen={setters.setBrandSectionOpen}
            setCategorySectionOpen={setters.setCategorySectionOpen}
            setConditionSectionOpen={setters.setConditionSectionOpen}
          />
          
          {/* Product Grid */}
          <div className="flex-grow">
            <ProductList 
              products={filteredProducts} 
              resetFilters={actions.resetFilters} 
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
