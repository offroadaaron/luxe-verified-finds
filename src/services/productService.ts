
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";

/**
 * Fetch all products from database
 */
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  // Format the data to match the Product type
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand || "",
    price: item.price,
    originalPrice: item.original_price,
    images: item.additional_images ? 
      [item.image_url, ...processImageArray(item.additional_images)] : 
      [item.image_url],
    condition: "New", // Default condition since it doesn't exist in the database
    authenticated: true,
    category: item.category
  }));
};

/**
 * Helper function to process image array from JSON 
 * and ensure it only contains strings
 */
const processImageArray = (images: any): string[] => {
  if (!Array.isArray(images)) {
    return [];
  }
  
  // Filter out non-string values
  return images.filter(img => typeof img === 'string');
};

/**
 * Fetch a product by ID
 */
export const getProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
  
  return {
    id: data.id,
    name: data.name,
    brand: data.brand || "",
    price: data.price,
    originalPrice: data.original_price,
    images: data.additional_images ? 
      [data.image_url, ...processImageArray(data.additional_images)] : 
      [data.image_url],
    condition: "New", // Default condition
    authenticated: true,
    category: data.category
  };
};

/**
 * Fetch products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
  
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand || "",
    price: item.price,
    originalPrice: item.original_price,
    images: item.additional_images ? 
      [item.image_url, ...processImageArray(item.additional_images)] : 
      [item.image_url],
    condition: "New", // Default condition
    authenticated: true,
    category: item.category
  }));
};

/**
 * Fetch featured products
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4);

  if (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
  
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand || "",
    price: item.price,
    originalPrice: item.original_price,
    images: item.additional_images ? 
      [item.image_url, ...processImageArray(item.additional_images)] : 
      [item.image_url],
    condition: "New", // Default condition
    authenticated: true,
    category: item.category
  }));
};
