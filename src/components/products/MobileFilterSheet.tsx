
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MobileFilterSheetProps {
  selectedSort: string;
  setSelectedSort: (value: string) => void;
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
}

const MobileFilterSheet = ({
  selectedSort,
  setSelectedSort,
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
  genders
}: MobileFilterSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-luxe-gold/30 md:hidden"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Sort By */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sort By</h3>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="border-luxe-gold/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Gender Filter - Mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Gender</h3>
            <ToggleGroup 
              type="single" 
              value={selectedGender}
              onValueChange={(value) => value && updateFilter('gender', value)}
              className="flex flex-wrap gap-2"
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
          
          {/* Price Range - Mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Price Range</h3>
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
          
          {/* Category, Brand, Condition Tabs */}
          <Tabs defaultValue="category" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="brand">Brand</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="category" className="space-y-2 mt-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`mobile-${category}`}
                    name="mobile-category"
                    checked={selectedCategory === category}
                    onChange={() => updateFilter('category', category)}
                    className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                  />
                  <Label htmlFor={`mobile-${category}`}>{category}</Label>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="brand" className="space-y-2 mt-4">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <input 
                    type="radio"
                    id={`mobile-${brand}`}
                    name="mobile-brand"
                    checked={selectedBrand === brand}
                    onChange={() => updateFilter('brand', brand)}
                    className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                  />
                  <Label htmlFor={`mobile-${brand}`}>{brand}</Label>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="condition" className="space-y-2 mt-4">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`mobile-${condition}`}
                    name="mobile-condition"
                    checked={selectedCondition === condition}
                    onChange={() => updateFilter('condition', condition)}
                    className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                  />
                  <Label htmlFor={`mobile-${condition}`}>{condition}</Label>
                </div>
              ))}
            </TabsContent>
          </Tabs>
          
          {/* Verified Only - Mobile */}
          <div className="pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="mobile-verified-only" 
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
              />
              <Label htmlFor="mobile-verified-only">Verified Authentic Only</Label>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col space-y-3">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
