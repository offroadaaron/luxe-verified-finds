import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  condition: string;
  authenticated: boolean;
  category: string;
  gender?: string; // Added gender property as optional
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.authenticated && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-luxe-gold text-black font-medium">Verified Authentic</Badge>
            </div>
          )}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-luxe-darkgray rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-luxe-gold transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-luxe-gold">{product.brand}</p>
          <h3 className="text-base font-medium">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground capitalize">
            {product.condition} • {product.category}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
