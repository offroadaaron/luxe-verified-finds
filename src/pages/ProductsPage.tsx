
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Product } from '@/components/ProductCard';
import ProductGrid from '@/components/products/ProductGrid';
import MobileFilterSheet from '@/components/products/MobileFilterSheet';
import DesktopFilters from '@/components/products/DesktopFilters';
import SortSelect from '@/components/products/SortSelect';
import { useProductFilters, productConstants } from '@/hooks/useProductFilters';

// Mock data for products
const productsData: Product[] = [
  {
    id: '1',
    name: 'Birkin 30 Togo Leather Bag',
    brand: 'Hermès',
    price: 18500,
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
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
    category: 'Watches',
    gender: 'Mens'
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
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '4',
    name: 'Love Bracelet Yellow Gold',
    brand: 'Cartier',
    price: 6450,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Jewelry',
    gender: 'Womens'
  },
  {
    id: '5',
    name: 'Classic Flap Bag Medium',
    brand: 'Chanel',
    price: 7500,
    originalPrice: 8800,
    images: ['https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Good',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '6',
    name: 'Royal Oak Chronograph 41mm',
    brand: 'Audemars Piguet',
    price: 42000,
    images: ['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '7',
    name: 'Serpenti Forever Crossbody',
    brand: 'Bvlgari',
    price: 1950,
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '8',
    name: 'Panthère de Cartier Watch',
    brand: 'Cartier',
    price: 9800,
    originalPrice: 11200,
    images: ['https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1654&q=80'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  }
];

const ProductsPage = () => {
  const { brands, categories, conditions, genders } = productConstants;
  
  const {
    filters,
    setters,
    actions
  } = useProductFilters(productsData);
  
  const filteredProducts = actions.filterProducts();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="luxe-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium">
            {filters.selectedCategory !== 'All Categories' 
              ? filters.selectedCategory 
              : filters.selectedGender !== 'All' 
                ? `${filters.selectedGender} Products` 
                : 'All Products'}
          </h1>
          
          <div className="flex items-center gap-4">
            <SortSelect 
              selectedSort={filters.selectedSort} 
              onValueChange={(val) => {
                setters.setSelectedSort(val);
                setTimeout(() => actions.applyFilters(), 0);
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
            <ProductGrid 
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
