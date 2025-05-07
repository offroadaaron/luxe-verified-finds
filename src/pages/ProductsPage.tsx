
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductList from '@/components/products/ProductList';
import MobileFilterSheet from '@/components/products/MobileFilterSheet';
import DesktopFilters from '@/components/products/DesktopFilters';
import SortSelect from '@/components/products/SortSelect';
import { useProductFilters, productConstants } from '@/hooks/useProductFilters';

const ProductsPage = () => {
  const { brands, categories, conditions, genders } = productConstants;
  
  const {
    filters,
    setters,
    actions
  } = useProductFilters();
  
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
