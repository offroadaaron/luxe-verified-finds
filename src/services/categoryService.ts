
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  featured: boolean;
};

/**
 * Fetch all categories from database
 */
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
};

/**
 * Fetch featured categories
 */
export const getFeaturedCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('featured', true);

  if (error) {
    console.error("Error fetching featured categories:", error);
    throw error;
  }

  return data;
};

/**
 * Get category by name
 */
export const getCategoryByName = async (name: string): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('name', name)
    .single();

  if (error) {
    console.error(`Error fetching category with name ${name}:`, error);
    throw error;
  }

  return data;
};
