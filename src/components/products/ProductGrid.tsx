
import React from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  products: Product[];
  resetFilters: () => void;
}

const ProductGrid = ({ products, resetFilters }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
        <Button 
          variant="outline"
          className="mt-4 border-luxe-gold/30"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-luxe-gold/30">
            Load More Products
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
