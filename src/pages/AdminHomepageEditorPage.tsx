
import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const defaultHomepageConfig = {
  instagram: "https://instagram.com/yourbrand",
  facebook: "https://facebook.com/yourbrand",
  twitter: "https://twitter.com/yourbrand",
  tiktok: "https://tiktok.com/@yourbrand",
  heroImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  secondaryImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
};

const AdminHomepageEditorPage = () => {
  const [config, setConfig] = useState(defaultHomepageConfig);
  const [saved, setSaved] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(c => ({ ...c, [name]: value }));
    setSaved(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConfig(c => ({ ...c, [key]: reader.result as string }));
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success("Homepage settings saved successfully");
  };

  return (
    <AdminLayout>
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Homepage Editor</h1>
      <form onSubmit={handleSave} className="w-full max-w-xl space-y-4 md:space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Social Media Links</h2>
          <div>
            <label className="block mb-1 font-medium">Instagram URL</label>
            <Input name="instagram" value={config.instagram} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Facebook URL</label>
            <Input name="facebook" value={config.facebook} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Twitter/X URL</label>
            <Input name="twitter" value={config.twitter} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">TikTok URL</label>
            <Input name="tiktok" value={config.tiktok} onChange={handleChange} />
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-medium">Featured Images</h2>
          <div>
            <label className="block mb-1 font-medium">Hero Image</label>
            <Input name="heroImage" value={config.heroImage} onChange={handleChange} className="mb-2" />
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'heroImage')} className="w-full" />
            <div className="mt-2 p-2 border rounded">
              <img src={config.heroImage} alt="Hero Preview" className="w-full h-24 object-cover rounded" />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Secondary Image</label>
            <Input name="secondaryImage" value={config.secondaryImage} onChange={handleChange} className="mb-2" />
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'secondaryImage')} className="w-full" />
            <div className="mt-2 p-2 border rounded">
              <img src={config.secondaryImage} alt="Secondary Preview" className="w-full h-24 object-cover rounded" />
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
        {saved && <div className="text-green-600 text-sm">Homepage settings saved (mock only)</div>}
      </form>
    </AdminLayout>
  );
};

export default AdminHomepageEditorPage;
