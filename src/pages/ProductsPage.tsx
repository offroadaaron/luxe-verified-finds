import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Filter, SlidersHorizontal, X } from 'lucide-react';

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedGender, setSelectedGender] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter section toggle states (for desktop)
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [conditionSectionOpen, setConditionSectionOpen] = useState(true);

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
        // Assume product.gender exists; fallback to show all if not set
        if (!('gender' in product)) return true;
        return product.gender && product.gender.toLowerCase() === selectedGender.toLowerCase();
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

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="luxe-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium">All Products</h1>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-72">
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
            
            <Button
              variant="outline"
              className="border-luxe-gold/30 md:hidden"
              onClick={toggleMobileFilters}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="space-y-6">
              {/* Gender Filter */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gender</h3>
                <div className="flex gap-2">
                  {genders.map(g => (
                    <Button
                      key={g}
                      variant={selectedGender === g ? "default" : "outline"}
                      className="text-xs px-4 py-2"
                      onClick={() => setSelectedGender(g)}
                    >
                      {g}
                    </Button>
                  ))}
                </div>
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
              <div className="space-y-2 border-t border-border pt-6">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => setBrandSectionOpen(!brandSectionOpen)}
                >
                  <h3 className="text-lg font-medium">Brand</h3>
                  {brandSectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                
                {brandSectionOpen && (
                  <div className="space-y-2 mt-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <input 
                          type="radio"
                          id={brand}
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                        />
                        <Label htmlFor={brand}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="space-y-2 border-t border-border pt-6">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => setCategorySectionOpen(!categorySectionOpen)}
                >
                  <h3 className="text-lg font-medium">Category</h3>
                  {categorySectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                
                {categorySectionOpen && (
                  <div className="space-y-2 mt-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Condition Filter */}
              <div className="space-y-2 border-t border-border pt-6">
                <div 
                  className="flex items-center justify-between cursor-pointer" 
                  onClick={() => setConditionSectionOpen(!conditionSectionOpen)}
                >
                  <h3 className="text-lg font-medium">Condition</h3>
                  {conditionSectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
                
                {conditionSectionOpen && (
                  <div className="space-y-2 mt-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={condition}
                          name="condition"
                          checked={selectedCondition === condition}
                          onChange={() => setSelectedCondition(condition)}
                          className="w-4 h-4 text-luxe-gold focus:ring-luxe-gold"
                        />
                        <Label htmlFor={condition}>{condition}</Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Verified Only Filter */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="verified-only" 
                    checked={verifiedOnly}
                    onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
                  />
                  <Label htmlFor="verified-only">Verified Authentic Only</Label>
                </div>
              </div>
              
              <Button 
                className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black"
              >
                Apply Filters
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-luxe-gold/30"
                onClick={() => {
                  setPriceRange([0, 50000]);
                  setSelectedBrand('All Brands');
                  setSelectedCategory('All Categories');
                  setSelectedCondition('All Conditions');
                  setSelectedGender('All');
                  setVerifiedOnly(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Mobile Filters Modal/Drawer (simple implementation) */}
          {mobileFiltersOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-background p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Filters</h3>
                <button onClick={toggleMobileFilters}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Mobile filter content - simplified for brevity */}
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
                
                {/* Similar filter sections as in the desktop version */}
                {/* Simplified for brevity */}
                
                <div className="pt-4 flex flex-col space-y-3">
                  <Button 
                    className="w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black"
                    onClick={toggleMobileFilters}
                  >
                    Apply Filters
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-luxe-gold/30"
                    onClick={() => {
                      // Reset filters
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-luxe-gold/30">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
