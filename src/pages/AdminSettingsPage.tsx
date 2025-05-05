import React, { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultSettings = {
  siteName: "Luxe Verified Finds",
  supportEmail: "support@luxeverified.com",
  theme: "light",
  maintenance: false,
};

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(s => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <form onSubmit={handleSave} className="max-w-xl space-y-6">
        <div>
          <label className="block mb-1 font-medium">Site Name</label>
          <Input name="siteName" value={settings.siteName} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Support Email</label>
          <Input name="supportEmail" value={settings.supportEmail} onChange={handleChange} type="email" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Theme</label>
          <select name="theme" value={settings.theme} onChange={handleChange} className="border rounded px-2 py-1">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="maintenance"
            checked={settings.maintenance}
            onChange={handleChange}
            className="mr-2"
            id="maintenance"
          />
          <label htmlFor="maintenance" className="font-medium">Maintenance Mode</label>
        </div>
        <Button type="submit">Save Settings</Button>
        {saved && <div className="text-green-600 text-sm">Settings saved (mock only)</div>}
      </form>
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">Current Settings</h2>
        <ul className="text-sm">
          <li><strong>Site Name:</strong> {settings.siteName}</li>
          <li><strong>Support Email:</strong> {settings.supportEmail}</li>
          <li><strong>Theme:</strong> {settings.theme}</li>
          <li><strong>Maintenance Mode:</strong> {settings.maintenance ? "Enabled" : "Disabled"}</li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
