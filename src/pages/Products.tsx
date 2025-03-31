import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/categories';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial product list
  const initialProducts = [
    // Blouse Products
    { code: "NB-1", name: "4689 Cotton Blouse", costPrice: 45, price: 65, category: "Blouses", qty: 100, sold: 0 },
    { code: "NB-2", name: "4689 Cotton Blouse", costPrice: 60, price: 85, category: "Blouses", qty: 100, sold: 0 },
    { code: "NB-3", name: "Aravind Cotton Blouse", costPrice: 70, price: 100, category: "Blouses", qty: 100, sold: 0 },
    { code: "KB-1", name: "Kalamkari Blouse", costPrice: 45, price: 65, category: "Blouses", qty: 50, sold: 0 },
    { code: "KB-2", name: "Kalamkari Blouse", costPrice: 70, price: 100, category: "Blouses", qty: 75, sold: 0 },
    { code: "NB-4", name: "1.25m Cotton Blouse", costPrice: 100, price: 140, category: "Blouses", qty: 10, sold: 0 },
    { code: "KB-3", name: "Kalamkari Blouse", costPrice: 105, price: 140, category: "Blouses", qty: 25, sold: 0 },

    // Sarees - KHP Series
    { code: "KHP01-06", name: "Ekkath kotta Saree", costPrice: 600, price: 840, category: "Sarees", qty: 6, sold: 0 },
    { code: "KHP02-1-10", name: "Ekkath kotta Saree", costPrice: 480, price: 680, category: "Sarees", qty: 10, sold: 0 },
    { code: "KHP3-1-5", name: "Cotton Saree", costPrice: 900, price: 1250, category: "Sarees", qty: 5, sold: 0 },
    { code: "KHP3-6-11", name: "Cotton Saree", costPrice: 950, price: 1350, category: "Sarees", qty: 6, sold: 0 },

    // Sarees - LTN Series
    { code: "LTN-2646-1-5", name: "Zari Border Saree", costPrice: 550, price: 780, category: "Sarees", qty: 5, sold: 0 },
    { code: "LTN-8790-1-2", name: "Zari Border Saree", costPrice: 650, price: 920, category: "Sarees", qty: 2, sold: 0 },
    { code: "LTN-9227-1-5", name: "Zari Border Saree", costPrice: 525, price: 750, category: "Sarees", qty: 5, sold: 0 },
    { code: "LTN-6551-4", name: "Muthukattam Saree", costPrice: 630, price: 900, category: "Sarees", qty: 4, sold: 0 },
    { code: "LTN-6091-10", name: "Plain Kanchi Border", costPrice: 420, price: 600, category: "Sarees", qty: 10, sold: 0 },
    { code: "LTN-9430-6", name: "Plain Kanchi Border", costPrice: 770, price: 1100, category: "Sarees", qty: 6, sold: 0 },
    { code: "LTN-1084-5", name: "Butta Kanchi Border", costPrice: 700, price: 1000, category: "Sarees", qty: 5, sold: 0 },
    { code: "LTN-6870-8", name: "Butta Kanchi Border", costPrice: 680, price: 970, category: "Sarees", qty: 8, sold: 0 },
    { code: "LTN-5977-5", name: "Agarlic Cotton Silk", costPrice: 1085, price: 1550, category: "Sarees", qty: 5, sold: 0 },
    { code: "LTN-8739-5", name: "Agarlic Seer Pallu", costPrice: 1190, price: 1700, category: "Sarees", qty: 5, sold: 0 },
    { code: "LTN-9604-5", name: "Agarlic Cotton Butta", costPrice: 2415, price: 3450, category: "Sarees", qty: 5, sold: 0 },

    // Sarees - RVV Series
    { code: "RVV-1-14", name: "Kalyani Cotton", costPrice: 595, price: 850, category: "Sarees", qty: 14, sold: 0 },
    { code: "RVV-2-7", name: "Kalyani Big Border", costPrice: 630, price: 900, category: "Sarees", qty: 7, sold: 0 },
    { code: "RVV-3-13", name: "Zari Border", costPrice: 770, price: 1100, category: "Sarees", qty: 13, sold: 0 },
    { code: "RVV-4-5", name: "Muthukattam", costPrice: 763, price: 1090, category: "Sarees", qty: 5, sold: 0 },
    { code: "RVV-5-7", name: "Plain Kanchi", costPrice: 1155, price: 1650, category: "Sarees", qty: 8, sold: 0 },
    { code: "RVV-6-8", name: "Plain Kanchi", costPrice: 1260, price: 1800, category: "Sarees", qty: 8, sold: 0 },
    { code: "RVV-7-1", name: "Butta Kanchi", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },

    // Sarees - SSE Series
    { code: "SSE-0205", name: "Pathik Saree", costPrice: 595, price: 850, category: "Sarees", qty: 1, sold: 0 },
    { code: "SSE-19", name: "Mallika 5.50 Mtr", costPrice: 385, price: 550, category: "Sarees", qty: 20, sold: 0 },
    { code: "SSE-013", name: "Pathik Chudi", costPrice: 980, price: 1400, category: "Sarees", qty: 1, sold: 0 },
    { code: "SSE-0166", name: "Pathik Chudi", costPrice: 763, price: 1090, category: "Sarees", qty: 2, sold: 0 },
    { code: "SSE-0204", name: "Pathik Saree", costPrice: 1155, price: 1650, category: "Sarees", qty: 3, sold: 0 },
    { code: "SSE-0200", name: "Pathik Saree", costPrice: 525, price: 750, category: "Sarees", qty: 1, sold: 0 },
    { code: "SSE-145", name: "Malliga Cool", costPrice: 410, price: 585, category: "Sarees", qty: 10, sold: 0 },
    { code: "SSE-199", name: "Malliga Cool", costPrice: 700, price: 1000, category: "Sarees", qty: 9, sold: 0 },
    { code: "SSE-093", name: "SSS Kotta", costPrice: 420, price: 600, category: "Sarees", qty: 10, sold: 0 },
    { code: "SSE-95", name: "Jaikali", costPrice: 420, price: 600, category: "Sarees", qty: 5, sold: 0 },

    // Sarees - SSSK Series
    { code: "SSSK-1-8", name: "Ekkath Kotta", costPrice: 665, price: 950, category: "Sarees", qty: 8, sold: 0 },
    { code: "SSSK-2-1-20", name: "Ekkath Kotta", costPrice: 1085, price: 1550, category: "Sarees", qty: 20, sold: 0 },

    // Sarees - VWCS Series
    { code: "VWCS-1-1-2", name: "Zari Border", costPrice: 805, price: 1150, category: "Sarees", qty: 2, sold: 0 },
    { code: "VWCS-1-1-3-4", name: "Zari Border", costPrice: 875, price: 1250, category: "Sarees", qty: 2, sold: 0 },
    { code: "VWCS-1-1-5-7", name: "Zari Border", costPrice: 910, price: 1300, category: "Sarees", qty: 3, sold: 0 },
    { code: "VWCS-2-1-6", name: "Muthukattam", costPrice: 973, price: 1390, category: "Sarees", qty: 6, sold: 0 },
    { code: "VWCS-3-1-15", name: "Plain Kanchi", costPrice: 1155, price: 1650, category: "Sarees", qty: 15, sold: 0 },
    { code: "VWCS-3-16=20", name: "Plain Kanchi", costPrice: 1099, price: 1570, category: "Sarees", qty: 5, sold: 0 },
    { code: "VWCS-4-1-7", name: "Butta Kanchi", costPrice: 1120, price: 1600, category: "Sarees", qty: 5, sold: 0 },
    { code: "VWCS-4-8-10", name: "Butta Kanchi", costPrice: 1204, price: 1720, category: "Sarees", qty: 5, sold: 0 },
    { code: "VWCS-5-1-14", name: "Agarlic Silk", costPrice: 952, price: 1360, category: "Sarees", qty: 14, sold: 0 },
    { code: "VWCS-6-1-7", name: "Seer Pallu", costPrice: 882, price: 1260, category: "Sarees", qty: 7, sold: 0 },
    { code: "VWCS-7-1-2", name: "Agarlic Butta", costPrice: 1050, price: 1500, category: "Sarees", qty: 2, sold: 0 },
    { code: "VWCS-8-1-3", name: "Vaiaroosi", costPrice: 1260, price: 1800, category: "Sarees", qty: 3, sold: 0 },
    { code: "VWCS-9-1-14", name: "Kattam Butta", costPrice: 1295, price: 1850, category: "Sarees", qty: 14, sold: 0 },
    { code: "VWCS-10-1-8", name: "Muthukattam", costPrice: 1400, price: 2000, category: "Sarees", qty: 8, sold: 0 },
    { code: "VWCS-11-1-5", name: "Plain Araimadam", costPrice: 1470, price: 2100, category: "Sarees", qty: 5, sold: 0 },
    { code: "VWCS-12-1-4", name: "Plain Kanchi", costPrice: 1715, price: 2450, category: "Sarees", qty: 4, sold: 0 },

    // Sarees - MG Series
    { code: "MG-1324-1", name: "Cotton Saree", costPrice: 1015, price: 1450, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1324-2", name: "Cotton Saree", costPrice: 1015, price: 1450, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1030-1", name: "Cotton Saree", costPrice: 1260, price: 1800, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1030-2", name: "Cotton Saree", costPrice: 1260, price: 1800, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1004-1", name: "Cotton Saree", costPrice: 1400, price: 2000, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1004-2", name: "Cotton Saree", costPrice: 1400, price: 2000, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1323-1", name: "Cotton Saree", costPrice: 1015, price: 1450, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1323-2", name: "Cotton Saree", costPrice: 1015, price: 1450, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1323-3", name: "Cotton Saree", costPrice: 1015, price: 1450, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1326-1", name: "Cotton Saree", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1326-2", name: "Cotton Saree", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1326-3", name: "Cotton Saree", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1326-4", name: "Cotton Saree", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-1326-5", name: "Cotton Saree", costPrice: 1120, price: 1600, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-1", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-2", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-3", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-4", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-5", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-6", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-8", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-9", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },
    { code: "MG-K3-10", name: "Cotton Saree", costPrice: 399, price: 570, category: "Sarees", qty: 1, sold: 0 },

    // Sarees - OS Series (Old Stock)
    { code: "OS-1", name: "Kalyani Cotton", costPrice: 630, price: 900, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-2", name: "Kalyani Cotton", costPrice: 630, price: 900, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-3", name: "Kalyani Cotton", costPrice: 630, price: 900, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-4", name: "Kalyani Cotton", costPrice: 595, price: 850, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-5", name: "Kalyani Cotton", costPrice: 595, price: 850, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-6", name: "Kalyani Cotton", costPrice: 630, price: 900, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-7", name: "Kalyani Cotton", costPrice: 945, price: 1350, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-8", name: "Kalyani Cotton", costPrice: 945, price: 1350, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-9", name: "Kalyani Cotton", costPrice: 945, price: 1350, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-10", name: "9 Yards Kalyani", costPrice: 1400, price: 2000, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-11", name: "9 Yards Kalyani", costPrice: 1400, price: 2000, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-12", name: "6 Yards Kalyani", costPrice: 770, price: 1100, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-13", name: "6 Yards Kalyani", costPrice: 770, price: 1100, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-14", name: "Kalyani Cotton", costPrice: 840, price: 1200, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-15", name: "Kalyani Cotton", costPrice: 840, price: 1200, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-16", name: "Kalyani Cotton", costPrice: 840, price: 1200, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-17", name: "Kalyani Cotton", costPrice: 315, price: 450, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-18", name: "Kalyani Cotton", costPrice: 315, price: 450, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-19", name: "Kalyani Cotton", costPrice: 315, price: 450, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-20", name: "Kalyani Cotton", costPrice: 315, price: 450, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-21", name: "Kalyani Cotton", costPrice: 525, price: 750, category: "Sarees", qty: 1, sold: 0 },
    { code: "OS-22", name: "Kalyani Cotton", costPrice: 525, price: 750, category: "Sarees", qty: 1, sold: 0 },

    // Chudidhars - MG Series
    { code: "MG-VC87-1-1", name: "Chudidhar", costPrice: 980, price: 1400, category: "Chudidhars", qty: 1, sold: 0 },
    { code: "MG-VC87-2-1", name: "Chudidhar", costPrice: 840, price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
    { code: "MG-VC87-2-2", name: "Chudidhar", costPrice: 840, price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
    { code: "MG-VC87-2-3", name: "Chudidhar", costPrice: 840, price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
    { code: "MG-VC87-3-1", name: "Chudidhar", costPrice: 840, price: 1200, category: "Chudidhars", qty: 1, sold: 0 },

    // Chudidhars - SC Series
    { code: "SC-101-1-15", name: "Chudidhar", costPrice: 700, price: 1000, category: "Chudidhars", qty: 15, sold: 0 },
    { code: "SC-338-5", name: "Chudidhar", costPrice: 910, price: 1300, category: "Chudidhars", qty: 5, sold: 0 },
    { code: "SC-307-3", name: "Chudidhar", costPrice: 1155, price: 1650, category: "Chudidhars", qty: 3, sold: 0 }
  ];

  // Load products from localStorage or fall back to initial
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Update localStorage whenever products data changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // === Add Product Modal States ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: categories.length > 1 ? categories[1] : 'Blouses', // default to something valid
    costPrice: 0,
    price: 0,
    qty: 0,
    sold: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // === Category & Search ===
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // === Stock Increase/Decrease ===
  const handleStockChange = (code, quantityChange) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.code === code
          ? { ...product, qty: Math.max(0, product.qty + quantityChange) }
          : product
      )
    );
  };

  // === Add Product Logic ===
  const validateForm = (prod) => {
    const errors = {};
    if (!prod.code.trim()) errors.code = 'Code is required';
    if (!prod.name.trim()) errors.name = 'Name is required';
    if (!prod.category.trim() || prod.category === 'All Products') {
      errors.category = 'Select a valid category';
    }
    if (prod.costPrice < 0) errors.costPrice = 'Cost cannot be negative';
    if (prod.price <= 0) errors.price = 'Price must be > 0';
    if (prod.qty < 0) errors.qty = 'Qty cannot be negative';
    if (prod.sold < 0) errors.sold = 'Sold cannot be negative';
    return errors;
  };

  const handleSaveProduct = () => {
    // Validate
    const errors = validateForm(newProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // Add new product
    setProducts([...products, newProduct]);
    setIsModalOpen(false);

    // Reset new product
    setNewProduct({
      code: '',
      name: '',
      category: categories.length > 1 ? categories[1] : 'Blouses',
      costPrice: 0,
      price: 0,
      qty: 0,
      sold: 0,
    });
    setFormErrors({});

    // Show success
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>

        {/* Right Section: Search + Add Product Button */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setFormErrors({});
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-4">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.code} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-semibold text-gray-500">{product.code}</div>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h3>
            <div className="text-sm text-gray-600 mt-1">Cost Price: ₹{product.costPrice}</div>
            <div className="text-2xl font-bold text-purple-600 mt-2">₹{product.price}</div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">{product.category}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.qty <= 0
                    ? 'bg-red-100 text-red-800'
                    : product.qty <= 3
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {product.qty <= 0 ? 'Out of stock' : `${product.qty} in stock`}
              </span>
            </div>

            {/* Buttons to change stock */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleStockChange(product.code, 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={product.qty >= 999} // Prevent stock beyond 999
              >
                Increase
              </button>
              <button
                onClick={() => handleStockChange(product.code, -1)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={product.qty <= 0}
              >
                Decrease
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                {/* Code */}
                <div>
                  <label className="block text-sm font-medium mb-1">Code *</label>
                  <input
                    name="code"
                    value={newProduct.code}
                    onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                    className={`w-full p-2 border rounded ${
                      formErrors.code ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.code && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.code}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className={`w-full p-2 border rounded ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className={`w-full p-2 border rounded ${
                      formErrors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {/* Filter out "All Products" to avoid confusion */}
                    {categories
                      .filter((cat) => cat !== 'All Products')
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
                  )}
                </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">Cost Price</label>
                  <input
                    type="number"
                    name="costPrice"
                    min="0"
                    step="0.01"
                    value={newProduct.costPrice}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, costPrice: parseFloat(e.target.value) || 0 })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.costPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.costPrice && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.costPrice}</p>
                  )}
                </div>

                {/* Selling Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">Selling Price *</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
                  )}
                </div>

                {/* Stock Qty */}
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="qty"
                    min="0"
                    value={newProduct.qty}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, qty: parseInt(e.target.value) || 0 })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.qty ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.qty && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.qty}</p>
                  )}
                </div>

                {/* Sold Qty */}
                <div>
                  <label className="block text-sm font-medium mb-1">Sold Quantity</label>
                  <input
                    type="number"
                    name="sold"
                    min="0"
                    value={newProduct.sold}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sold: parseInt(e.target.value) || 0 })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.sold ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.sold && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.sold}</p>
                  )}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormErrors({});
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-md">
          Product added successfully!
        </div>
      )}
    </div>
  );
};
