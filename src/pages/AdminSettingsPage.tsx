
import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook, Twitter, Settings } from "lucide-react";

const defaultSettings = {
  siteName: "Luxe Verified Finds",
  supportEmail: "support@luxeverified.com",
  theme: "light",
  maintenance: false,
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

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings(s => ({
      ...s,
      [name]: e.target.type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setSettings(s => ({
      ...s,
      socialLinks: {
        ...s.socialLinks,
        [name]: value
      }
    }));
    setSaved(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setSettings(s => ({
      ...s,
      homepageImages: {
        ...s.homepageImages,
        [name]: value
      }
    }));
    setSaved(false);
  };

  const handleHeroTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSettings(s => ({
      ...s,
      heroText: {
        ...s.heroText,
        [name]: value
      }
    }));
    setSaved(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSettings(s => ({
          ...s,
          homepageImages: {
            ...s.homepageImages,
            [type]: reader.result as string
          }
        }));
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success("Settings saved successfully");
  };

  return (
    <AdminLayout>
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Admin Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
        <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-3 w-full">
          <TabsTrigger value="general" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="homepage" className="flex items-center">
            <Instagram className="mr-2 h-4 w-4" /> Homepage & Social
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSave}>
          <TabsContent value="general" className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-1 font-medium">Site Name</label>
              <Input name="siteName" value={settings.siteName} onChange={handleGeneralChange} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Support Email</label>
              <Input name="supportEmail" value={settings.supportEmail} onChange={handleGeneralChange} type="email" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Theme</label>
              <select 
                name="theme" 
                value={settings.theme} 
                onChange={handleGeneralChange} 
                className="w-full border rounded px-2 py-1.5"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="maintenance"
                checked={settings.maintenance}
                onChange={handleGeneralChange}
                className="mr-2"
                id="maintenance"
              />
              <label htmlFor="maintenance" className="font-medium">Maintenance Mode</label>
            </div>
          </TabsContent>
          
          <TabsContent value="homepage" className="space-y-8">
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-lg">Hero Content</h3>
              
              <div>
                <label className="block mb-1 font-medium">Hero Heading</label>
                <Input 
                  name="heading" 
                  value={settings.heroText.heading} 
                  onChange={handleHeroTextChange} 
                  className="mb-2"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Hero Subheading</label>
                <Input 
                  name="subheading" 
                  value={settings.heroText.subheading} 
                  onChange={handleHeroTextChange} 
                  className="mb-2"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Hero Image</label>
                <Input 
                  name="heroImage" 
                  value={settings.homepageImages.heroImage} 
                  onChange={handleImageChange} 
                  className="mb-2"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'heroImage')} 
                  className="w-full border p-2 rounded"
                />
                <div className="mt-2 p-2 border rounded">
                  <img 
                    src={settings.homepageImages.heroImage} 
                    alt="Hero Preview" 
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Secondary Image</label>
                <Input 
                  name="secondaryImage" 
                  value={settings.homepageImages.secondaryImage} 
                  onChange={handleImageChange} 
                  className="mb-2"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'secondaryImage')} 
                  className="w-full border p-2 rounded"
                />
                <div className="mt-2 p-2 border rounded">
                  <img 
                    src={settings.homepageImages.secondaryImage} 
                    alt="Secondary Preview" 
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium text-lg">Social Media Links</h3>
              
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-pink-500" />
                <Input 
                  name="instagram" 
                  value={settings.socialLinks.instagram} 
                  onChange={handleSocialLinkChange} 
                  placeholder="Instagram URL"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-blue-600" />
                <Input 
                  name="facebook" 
                  value={settings.socialLinks.facebook} 
                  onChange={handleSocialLinkChange} 
                  placeholder="Facebook URL"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <Input 
                  name="twitter" 
                  value={settings.socialLinks.twitter} 
                  onChange={handleSocialLinkChange} 
                  placeholder="Twitter/X URL"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <Input 
                  name="tiktok" 
                  value={settings.socialLinks.tiktok} 
                  onChange={handleSocialLinkChange} 
                  placeholder="TikTok URL"
                />
              </div>
            </div>
          </TabsContent>
          
          <div className="flex items-center gap-4 mt-6">
            <Button type="submit">Save Settings</Button>
            {saved && <div className="text-green-600 text-sm">Settings saved successfully (mock only)</div>}
          </div>
        </form>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
