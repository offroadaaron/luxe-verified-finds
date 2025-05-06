
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DesktopFiltersProps {
  selectedGender: string;
  selectedCategory: string;
  selectedBrand: string;
  selectedCondition: string;
  verifiedOnly: boolean;
  priceRange: number[];
  updateFilter: (type: string, value: string) => void;
  setPriceRange: (range: number[]) => void;
  setVerifiedOnly: (value: boolean) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  brands: string[];
  categories: string[];
  conditions: string[];
  genders: string[];
  brandSectionOpen: boolean;
  categorySectionOpen: boolean;
  conditionSectionOpen: boolean;
  setBrandSectionOpen: (open: boolean) => void;
  setCategorySectionOpen: (open: boolean) => void;
  setConditionSectionOpen: (open: boolean) => void;
}

const DesktopFilters = ({
  selectedGender,
  selectedCategory,
  selectedBrand,
  selectedCondition,
  verifiedOnly,
  priceRange,
  updateFilter,
  setPriceRange,
  setVerifiedOnly,
  applyFilters,
  resetFilters,
  brands,
  categories,
  conditions,
  genders,
  brandSectionOpen,
  categorySectionOpen,
  conditionSectionOpen,
  setBrandSectionOpen,
  setCategorySectionOpen,
  setConditionSectionOpen
}: DesktopFiltersProps) => {
  return (
    <div className="hidden md:block w-72 flex-shrink-0">
      <div className="space-y-6">
        {/* Gender Filter */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Gender</h3>
          <ToggleGroup 
            type="single" 
            value={selectedGender}
            onValueChange={(value) => {
              if (value) {
                updateFilter('gender', value);
                setTimeout(() => applyFilters(), 0);
              }
            }}
            className="flex gap-2"
          >
            {genders.map(g => (
              <ToggleGroupItem 
                key={g} 
                value={g}
                variant="outline"
                className="text-xs border-luxe-gold/30 data-[state=on]:bg-luxe-gold data-[state=on]:text-white"
              >
                {g}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Price Range Filter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Price Range</h3>
          </div>
          <Slider 
            defaultValue={[0, 50000]} 
            min={0} 
            max={50000} 
            step={500}
            value={priceRange}
            onValueChange={setPriceRange}
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">${priceRange[0].toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
        
        {/* Brand Filter */}
        <Collapsible open={brandSectionOpen} onOpenChange={setBrandSectionOpen} className="border-t border-border pt-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium">Brand</h3>
            {brandSectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-2 mt-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input 
                  type="radio"
                  id={brand}
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => {
                    updateFilter('brand', brand);
                    setTimeout(() => applyFilters(), 0);
                  }}
                  className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                />
                <Label htmlFor={brand}>{brand}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Category Filter */}
        <Collapsible open={categorySectionOpen} onOpenChange={setCategorySectionOpen} className="border-t border-border pt-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium">Category</h3>
            {categorySectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={category}
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => {
                    updateFilter('category', category);
                    setTimeout(() => applyFilters(), 0);
                  }}
                  className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Condition Filter */}
        <Collapsible open={conditionSectionOpen} onOpenChange={setConditionSectionOpen} className="border-t border-border pt-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-lg font-medium">Condition</h3>
            {conditionSectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-2 mt-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={condition}
                  name="condition"
                  checked={selectedCondition === condition}
                  onChange={() => {
                    updateFilter('condition', condition);
                    setTimeout(() => applyFilters(), 0);
                  }}
                  className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                />
                <Label htmlFor={condition}>{condition}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Verified Only Filter */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="verified-only" 
              checked={verifiedOnly}
              onCheckedChange={(checked) => {
                setVerifiedOnly(!!checked);
                setTimeout(() => applyFilters(), 0);
              }}
            />
            <Label htmlFor="verified-only">Verified Authentic Only</Label>
          </div>
        </div>
        
        <Button 
          className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
        
        <Button 
          variant="outline"
          className="w-full border-luxe-gold/30"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default DesktopFilters;
