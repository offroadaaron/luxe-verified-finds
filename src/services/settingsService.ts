
import { supabase } from "@/integrations/supabase/client";

export type HomepageSettings = {
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    tiktok: string;
  };
  homepageImages: {
    heroImage: string;
    secondaryImage: string;
  };
  heroText: {
    heading: string;
    subheading: string;
  };
};

export type GeneralSettings = {
  siteName: string;
  supportEmail: string;
  theme: string;
  maintenance: boolean;
};

/**
 * Fetch homepage settings from database
 */
export const getHomepageSettings = async (): Promise<HomepageSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'homepage')
    .single();

  if (error) {
    console.error("Error fetching homepage settings:", error);
    // Fallback to default settings
    const defaultSettings = localStorage.getItem('adminSettings');
    if (defaultSettings) {
      try {
        const parsedSettings = JSON.parse(defaultSettings);
        return parsedSettings;
      } catch (e) {
        console.error("Error parsing saved settings", e);
      }
    }
    throw error;
  }

  return data.value as HomepageSettings;
};

/**
 * Update homepage settings in database
 */
export const updateHomepageSettings = async (settings: HomepageSettings): Promise<void> => {
  const { error } = await supabase
    .from('site_settings')
    .update({ value: settings })
    .eq('key', 'homepage');

  if (error) {
    console.error("Error updating homepage settings:", error);
    throw error;
  }
};

/**
 * Fetch general settings from database
 */
export const getGeneralSettings = async (): Promise<GeneralSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'general')
    .single();

  if (error) {
    console.error("Error fetching general settings:", error);
    throw error;
  }

  return data.value as GeneralSettings;
};

/**
 * Update general settings in database
 */
export const updateGeneralSettings = async (settings: GeneralSettings): Promise<void> => {
  const { error } = await supabase
    .from('site_settings')
    .update({ value: settings })
    .eq('key', 'general');

  if (error) {
    console.error("Error updating general settings:", error);
    throw error;
  }
};
