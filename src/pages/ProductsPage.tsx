
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

// Updated Product type definition to include gender
declare module '@/components/ProductCard' {
  interface Product {
    gender?: string;
  }
}

// Mock data for products
const productsData: Product[] = [
  {
    id: '1',
    name: 'Birkin 30 Togo Leather Bag',
    brand: 'Hermès',
    price: 18500,
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '2',
    name: 'Submariner Date 41mm',
    brand: 'Rolex',
    price: 15750,
    originalPrice: 17800,
    images: ['https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '3',
    name: 'Double G Marmont Bag',
    brand: 'Gucci',
    price: 2350,
    originalPrice: 2980,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '4',
    name: 'Love Bracelet Yellow Gold',
    brand: 'Cartier',
    price: 6450,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Jewelry',
    gender: 'Womens'
  },
  {
    id: '5',
    name: 'Classic Flap Bag Medium',
    brand: 'Chanel',
    price: 7500,
    originalPrice: 8800,
    images: ['https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'],
    condition: 'Good',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '6',
    name: 'Royal Oak Chronograph 41mm',
    brand: 'Audemars Piguet',
    price: 42000,
    images: ['https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  },
  {
    id: '7',
    name: 'Serpenti Forever Crossbody',
    brand: 'Bvlgari',
    price: 1950,
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags',
    gender: 'Womens'
  },
  {
    id: '8',
    name: 'Panthère de Cartier Watch',
    brand: 'Cartier',
    price: 9800,
    originalPrice: 11200,
    images: ['https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1654&q=80'],
    condition: 'Like New',
    authenticated: true,
    category: 'Watches',
    gender: 'Mens'
  }
];

const brands = ['All Brands', 'Hermès', 'Rolex', 'Gucci', 'Cartier', 'Chanel', 'Audemars Piguet', 'Bvlgari'];
const categories = ['All Categories', 'Handbags', 'Watches', 'Jewelry', 'Accessories'];
const conditions = ['All Conditions', 'Like New', 'Excellent', 'Very Good', 'Good'];
const genders = ['All', 'Mens', 'Womens'];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedGender, setSelectedGender] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // UI state
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [conditionSectionOpen, setConditionSectionOpen] = useState(true);

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const genderParam = searchParams.get('gender');
    const brandParam = searchParams.get('brand');
    const conditionParam = searchParams.get('condition');
    const verifiedParam = searchParams.get('verified');
    const sortParam = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    if (genderParam) {
      setSelectedGender(genderParam);
    }

    if (brandParam) {
      setSelectedBrand(brandParam);
    }

    if (conditionParam) {
      setSelectedCondition(conditionParam);
    }

    if (verifiedParam === 'true') {
      setVerifiedOnly(true);
    }

    if (sortParam) {
      setSelectedSort(sortParam);
    }

    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
  }, [searchParams]);

  // Apply filters to URL and maintain state
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All Categories') {
      params.set('category', selectedCategory);
    }
    
    if (selectedGender !== 'All') {
      params.set('gender', selectedGender);
    }

    if (selectedBrand !== 'All Brands') {
      params.set('brand', selectedBrand);
    }

    if (selectedCondition !== 'All Conditions') {
      params.set('condition', selectedCondition);
    }

    if (verifiedOnly) {
      params.set('verified', 'true');
    }

    if (selectedSort !== 'featured') {
      params.set('sort', selectedSort);
    }

    if (priceRange[0] > 0 || priceRange[1] < 50000) {
      params.set('minPrice', priceRange[0].toString());
      params.set('maxPrice', priceRange[1].toString());
    }
    
    setSearchParams(params, { replace: true });
  };

  // Filter products based on current state
  const filterProducts = () => {
    let filtered = [...productsData];

    if (selectedBrand !== 'All Brands') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedCondition !== 'All Conditions') {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    if (selectedGender !== 'All') {
      filtered = filtered.filter(product => {
        if (!product.gender) return false;
        return product.gender === selectedGender;
      });
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (verifiedOnly) {
      filtered = filtered.filter(product => product.authenticated);
    }

    // Sort products
    switch (selectedSort) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        // In a real app, we'd sort by date added
        return filtered;
      case 'featured':
      default:
        return filtered;
    }
  };

  const filteredProducts = filterProducts();

  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedBrand('All Brands');
    setSelectedCategory('All Categories');
    setSelectedCondition('All Conditions');
    setSelectedGender('All');
    setVerifiedOnly(false);
    setSelectedSort('featured');
    setSearchParams({});
  };

  const updateFilter = (type: string, value: string) => {
    switch (type) {
      case 'brand':
        setSelectedBrand(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
      case 'condition':
        setSelectedCondition(value);
        break;
      case 'gender':
        setSelectedGender(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="luxe-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium">
            {selectedCategory !== 'All Categories' 
              ? selectedCategory 
              : selectedGender !== 'All' 
                ? `${selectedGender} Products` 
                : 'All Products'}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-72">
              <Select value={selectedSort} onValueChange={(val) => {
                setSelectedSort(val);
                setTimeout(() => applyFilters(), 0);
              }}>
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
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
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
          
          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  variant="outline"
                  className="mt-4 border-luxe-gold/30"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" className="border-luxe-gold/30">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
