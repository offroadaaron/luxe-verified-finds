
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getHomepageSettings, updateHomepageSettings, HomepageSettings } from "@/services/settingsService";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const defaultHomepageConfig: HomepageSettings = {
  socialLinks: {
    instagram: "https://instagram.com/luxeverified",
    facebook: "https://facebook.com/luxeverified",
    twitter: "https://twitter.com/luxeverified",
    tiktok: "https://tiktok.com/@luxeverified",
  },
  homepageImages: {
    heroImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    secondaryImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  heroText: {
    heading: "Timeless Luxury, Verified Authenticity",
    subheading: "Discover handpicked, authenticated luxury pieces from the world's most prestigious brands."
  }
};

const AdminHomepageEditorPage = () => {
  const { isAdmin, isLoading } = useAuth();
  const [config, setConfig] = useState<HomepageSettings>(defaultHomepageConfig);

  // Fetch homepage settings from the database
  const { data: homepageSettings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['homepageSettings'],
    queryFn: getHomepageSettings,
    onSuccess: (data) => {
      if (data) {
        setConfig(data);
      }
    },
    onError: (error) => {
      console.error("Error loading homepage settings:", error);
      toast.error("Failed to load settings");
    }
  });

  // Update settings mutation
  const mutation = useMutation({
    mutationFn: updateHomepageSettings,
    onSuccess: () => {
      toast.success("Homepage settings saved successfully");
    },
    onError: (error) => {
      console.error("Error saving homepage settings:", error);
      toast.error("Failed to save settings");
    }
  });

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(c => ({ 
      ...c, 
      socialLinks: { 
        ...c.socialLinks, 
        [name]: value 
      }
    }));
  };

  const handleHeroTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(c => ({ 
      ...c, 
      heroText: { 
        ...c.heroText, 
        [name]: value 
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(c => ({ 
      ...c, 
      homepageImages: { 
        ...c.homepageImages, 
        [name]: value 
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(c => ({ 
          ...c, 
          homepageImages: { 
            ...c.homepageImages, 
            [key]: reader.result as string 
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(config);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Homepage Editor</h1>
      <form onSubmit={handleSave} className="w-full max-w-xl space-y-8">
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-medium">Hero Content</h2>
          
          <div>
            <label className="block mb-1 font-medium">Heading</label>
            <Input 
              name="heading" 
              value={config.heroText.heading} 
              onChange={handleHeroTextChange}
              className="mb-2"
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Subheading</label>
            <Input 
              name="subheading" 
              value={config.heroText.subheading} 
              onChange={handleHeroTextChange}
              className="mb-2" 
            />
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Hero Image</label>
            <Input name="heroImage" value={config.homepageImages.heroImage} onChange={handleImageChange} className="mb-2" />
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'heroImage')} className="w-full" />
            <div className="mt-2 p-2 border rounded">
              <img src={config.homepageImages.heroImage} alt="Hero Preview" className="w-full h-24 object-cover rounded" />
            </div>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Secondary Image</label>
            <Input name="secondaryImage" value={config.homepageImages.secondaryImage} onChange={handleImageChange} className="mb-2" />
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'secondaryImage')} className="w-full" />
            <div className="mt-2 p-2 border rounded">
              <img src={config.homepageImages.secondaryImage} alt="Secondary Preview" className="w-full h-24 object-cover rounded" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Social Media Links</h2>
          <div>
            <label className="block mb-1 font-medium">Instagram URL</label>
            <Input name="instagram" value={config.socialLinks.instagram} onChange={handleSocialLinkChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Facebook URL</label>
            <Input name="facebook" value={config.socialLinks.facebook} onChange={handleSocialLinkChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Twitter/X URL</label>
            <Input name="twitter" value={config.socialLinks.twitter} onChange={handleSocialLinkChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">TikTok URL</label>
            <Input name="tiktok" value={config.socialLinks.tiktok} onChange={handleSocialLinkChange} />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full sm:w-auto" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </AdminLayout>
  );
};

export default AdminHomepageEditorPage;
