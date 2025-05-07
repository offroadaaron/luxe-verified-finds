
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@/components/ProductCard';

export const useProductFilters = (productsData: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [selectedGender, setSelectedGender] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // UI state
  const [brandSectionOpen, setBrandSectionOpen] = useState(true);
  const [categorySectionOpen, setCategorySectionOpen] = useState(true);
  const [conditionSectionOpen, setConditionSectionOpen] = useState(true);

  // Initialize filters from URL params only once
  useEffect(() => {
    if (!isInitialized) {
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
      
      setIsInitialized(true);
    }
  }, [searchParams, isInitialized]);

  // Apply filters to URL without page reload
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

  // Update a single filter and don't apply automatically
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

  // Filter products based on current filter state
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

  return {
    filters: {
      priceRange,
      selectedBrand,
      selectedCategory,
      selectedCondition,
      selectedSort,
      selectedGender,
      verifiedOnly,
      brandSectionOpen,
      categorySectionOpen,
      conditionSectionOpen
    },
    setters: {
      setPriceRange,
      setSelectedSort,
      setVerifiedOnly,
      setBrandSectionOpen,
      setCategorySectionOpen,
      setConditionSectionOpen
    },
    actions: {
      updateFilter,
      applyFilters,
      resetFilters,
      filterProducts
    }
  };
};

export const productConstants = {
  brands: ['All Brands', 'Hermès', 'Rolex', 'Gucci', 'Cartier', 'Chanel', 'Audemars Piguet', 'Bvlgari'],
  categories: ['All Categories', 'Handbags', 'Watches', 'Jewelry', 'Accessories'],
  conditions: ['All Conditions', 'Like New', 'Excellent', 'Very Good', 'Good'],
  genders: ['All', 'Mens', 'Womens']
};
