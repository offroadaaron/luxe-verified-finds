
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const defaultHomepageConfig = {
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
  const [config, setConfig] = useState(defaultHomepageConfig);
  const [saved, setSaved] = useState(false);

  // Load any existing settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        if (parsedSettings.socialLinks || parsedSettings.homepageImages || parsedSettings.heroText) {
          setConfig({
            socialLinks: parsedSettings.socialLinks || defaultHomepageConfig.socialLinks,
            homepageImages: parsedSettings.homepageImages || defaultHomepageConfig.homepageImages,
            heroText: parsedSettings.heroText || defaultHomepageConfig.heroText
          });
        }
      } catch (e) {
        console.error("Error parsing saved settings", e);
      }
    }
  }, []);

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(c => ({ 
      ...c, 
      socialLinks: { 
        ...c.socialLinks, 
        [name]: value 
      }
    }));
    setSaved(false);
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
    setSaved(false);
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
    setSaved(false);
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
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage to simulate backend storage
    try {
      // Get existing settings first to avoid overwriting other settings
      const existingSettings = localStorage.getItem('adminSettings');
      const settings = existingSettings ? JSON.parse(existingSettings) : {};
      
      // Update with our new settings
      const updatedSettings = {
        ...settings,
        socialLinks: config.socialLinks,
        homepageImages: config.homepageImages,
        heroText: config.heroText
      };
      
      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
      setSaved(true);
      toast.success("Homepage settings saved successfully");
    } catch (e) {
      toast.error("Error saving settings");
      console.error(e);
    }
  };

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
        
        <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
        {saved && <div className="text-green-600 text-sm">Homepage settings saved</div>}
      </form>
    </AdminLayout>
  );
};

export default AdminHomepageEditorPage;
