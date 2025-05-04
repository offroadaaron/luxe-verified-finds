
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingBag, Shield, Award, ArrowRight, QrCode, Share2 } from 'lucide-react';
import { Product } from '@/components/ProductCard';

// Mock product data
const productData: Product = {
  id: '1',
  name: 'Birkin 30 Togo Leather Bag',
  brand: 'Hermès',
  price: 18500,
  images: [
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1604006852748-903fecf65d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1594408050689-0a6e8eb97cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1594408555981-c4e3bb1f4d73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  ],
  condition: 'Excellent',
  authenticated: true,
  category: 'Handbags'
};

// Additional product details
const productDetails = {
  description: 'The iconic Birkin 30 in Togo leather with gold hardware. This timeless piece features a spacious interior, signature lock closure, and protective feet. The bag is in excellent condition with minimal signs of wear on the corners.',
  color: 'Etoupe',
  material: 'Togo Leather',
  hardware: 'Gold',
  dimensions: '30 x 22 x 16 cm',
  year: '2019',
  accessories: 'Lock, Keys, Clochette, Dust bag',
  condition: 'Excellent - Very light corner wear, pristine interior',
  price: 18500,
  retailPrice: 22500,
  serialNumber: 'X1234XXX',
  sustainabilityImpact: {
    waterSaved: '8,500 liters',
    co2Reduced: '145 kg',
    wasteReduced: '2.3 kg'
  },
  authenticationDetails: {
    authenticatedBy: 'Sarah Johnson, Senior Authenticator',
    date: 'May 15, 2023',
    certificateId: 'LXV-H-12345-B30',
    authenticationNotes: 'Hardware weight, stitching pattern, and leather quality all verified as authentic.'
  }
};

const similarProducts: Product[] = [
  {
    id: '3',
    name: 'Double G Marmont Bag',
    brand: 'Gucci',
    price: 2350,
    originalPrice: 2980,
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'],
    condition: 'Very Good',
    authenticated: true,
    category: 'Handbags'
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
    category: 'Handbags'
  },
  {
    id: '7',
    name: 'Serpenti Forever Crossbody',
    brand: 'Bvlgari',
    price: 1950,
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80'],
    condition: 'Excellent',
    authenticated: true,
    category: 'Handbags'
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="luxe-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img 
                src={productData.images[selectedImage]} 
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productData.images.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 ${selectedImage === index ? 'ring-2 ring-luxe-gold' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${productData.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-medium text-luxe-gold">{productData.brand}</h2>
              <div className="flex space-x-3">
                <button 
                  className="text-gray-500 hover:text-luxe-gold"
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-luxe-gold text-luxe-gold' : ''}`} />
                </button>
                <button className="text-gray-500 hover:text-luxe-gold">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <h1 className="text-3xl font-serif font-medium mb-4">{productData.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {productData.authenticated && (
                <Badge className="bg-luxe-gold text-black font-medium">
                  <Shield className="h-3 w-3 mr-1" /> Verified Authentic
                </Badge>
              )}
              <Badge variant="outline" className="border-muted-foreground">
                {productData.condition} Condition
              </Badge>
            </div>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold">${productData.price.toLocaleString()}</span>
              {productDetails.retailPrice && (
                <span className="text-sm text-muted-foreground">
                  Retail: ${productDetails.retailPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-8">{productDetails.description}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-sm">Color</span>
                <span className="text-sm font-medium">{productDetails.color}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Material</span>
                <span className="text-sm font-medium">{productDetails.material}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hardware</span>
                <span className="text-sm font-medium">{productDetails.hardware}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dimensions</span>
                <span className="text-sm font-medium">{productDetails.dimensions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Year</span>
                <span className="text-sm font-medium">{productDetails.year}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 mb-8">
              <Button className="bg-luxe-gold hover:bg-luxe-gold/90 text-black">
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
              </Button>
              <Button variant="outline" className="border-luxe-gold/30">
                Request More Information
              </Button>
            </div>
            
            <div className="bg-secondary dark:bg-secondary/20 p-4 rounded-sm mb-8">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-luxe-gold mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium mb-1">Authentication Guarantee</h3>
                  <p className="text-xs text-muted-foreground">
                    Every item is meticulously verified by our team of experts. View this item's
                    digital certificate for detailed authentication information.
                  </p>
                  <Button 
                    variant="link" 
                    className="text-luxe-gold p-0 h-auto text-xs mt-1"
                  >
                    View Certificate <QrCode className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <p className="text-sm">{productDetails.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Condition Details</h4>
                    <p className="text-sm text-muted-foreground">{productDetails.condition}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Included Accessories</h4>
                    <p className="text-sm text-muted-foreground">{productDetails.accessories}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="authentication" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-luxe-gold" />
                    <h4 className="text-base font-medium">Certificate ID: {productDetails.authenticationDetails.certificateId}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {productDetails.authenticationDetails.authenticationNotes}
                  </p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Authenticated By</h4>
                    <p className="text-sm text-muted-foreground">{productDetails.authenticationDetails.authenticatedBy}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Date</h4>
                    <p className="text-sm text-muted-foreground">{productDetails.authenticationDetails.date}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sustainability" className="pt-4">
                <div className="space-y-4">
                  <p className="text-sm">
                    By choosing pre-owned luxury, you're making a positive impact on the environment.
                    Here's how purchasing this item helps:
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-secondary dark:bg-secondary/20 rounded-sm">
                      <p className="text-lg font-medium text-luxe-gold">{productDetails.sustainabilityImpact.waterSaved}</p>
                      <p className="text-xs text-muted-foreground">Water Saved</p>
                    </div>
                    <div className="text-center p-4 bg-secondary dark:bg-secondary/20 rounded-sm">
                      <p className="text-lg font-medium text-luxe-gold">{productDetails.sustainabilityImpact.co2Reduced}</p>
                      <p className="text-xs text-muted-foreground">CO2 Reduced</p>
                    </div>
                    <div className="text-center p-4 bg-secondary dark:bg-secondary/20 rounded-sm">
                      <p className="text-lg font-medium text-luxe-gold">{productDetails.sustainabilityImpact.wasteReduced}</p>
                      <p className="text-xs text-muted-foreground">Waste Reduced</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Similar Products */}
        <div className="mt-16">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl font-serif font-medium">You May Also Like</h2>
            <a href="/products" className="text-sm font-medium text-luxe-gold flex items-center">
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarProducts.map((product) => (
              <div key={product.id} className="group overflow-hidden">
                <a href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.authenticated && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-luxe-gold text-black font-medium">Verified</Badge>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-luxe-gold">{product.brand}</p>
                    <h3 className="text-base font-medium">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-semibold">${product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
