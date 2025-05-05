import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const mockProducts = [
  { id: "1", name: "Birkin 30 Togo Leather Bag", brand: "Hermès", price: 18500, category: "handbags", gender: "womens" },
  { id: "2", name: "Submariner Date 41mm", brand: "Rolex", price: 15750, category: "watches", gender: "mens" },
  { id: "3", name: "Speedmaster Professional", brand: "Omega", price: 6500, category: "watches", gender: "mens" },
  { id: "4", name: "Classic Flap Bag Medium", brand: "Chanel", price: 7500, category: "handbags", gender: "womens" },
  { id: "5", name: "Love Bracelet Yellow Gold", brand: "Cartier", price: 6450, category: "jewelry", gender: "womens" },
  { id: "6", name: "Santos de Cartier", brand: "Cartier", price: 8200, category: "watches", gender: "mens" },
  { id: "7", name: "Dior Saddle Bag", brand: "Dior", price: 4200, category: "handbags", gender: "womens" },
  { id: "8", name: "GMT-Master II", brand: "Rolex", price: 16900, category: "watches", gender: "mens" },
];

const CategoriesPage = () => {
  const { category } = useParams<{ category: string }>();

  let products;
  if (category === "mens") {
    products = mockProducts.filter(p => p.gender === "mens");
  } else if (category === "womens") {
    products = mockProducts.filter(p => p.gender === "womens");
  } else {
    products = mockProducts.filter(p => p.category === category);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">{category} Products</h1>
      {products.length === 0 ? (
        <div className="text-muted-foreground mb-6">No products found in this category.</div>
      ) : (
        <ul className="space-y-4 mb-6">
          {products.map(product => (
            <li key={product.id} className="border p-4 rounded-md flex justify-between items-center">
              <span>
                <span className="font-semibold">{product.name}</span> by {product.brand} (${product.price})
              </span>
              <Link to={`/products/${product.id}`}><Button>View</Button></Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/products"><Button variant="secondary">Back to Products</Button></Link>
    </div>
  );
};

export default CategoriesPage;
