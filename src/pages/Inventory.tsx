// Inventory.jsx (or .tsx if you're using TypeScript)
import React, { useState, useEffect } from 'react';
import { Search, Plus, CheckCircle } from 'lucide-react';

// 1. Import your categories array from categories.ts
//    Adjust the import path depending on your folder structure
import { categories } from '../data/categories';

const initialProducts = [
  {
    code: 'B-1',
    name: '4689 Cotton Blouse',
    category: 'Blouses',
    costPrice: 45,
    price: 65,
    qty: 100,
    sold: 10,
  },
  {
    code: 'B-2',
    name: 'Arvind Cotton Blouse',
    category: 'Blouses',
    costPrice: 60,
    price: 85,
    qty: 100,
    sold: 15,
  },
];

export const Inventory = () => {
  // === State Hooks ===
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || ''
  );

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product or edited product
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: '', // We'll choose from the dropdown
    costPrice: 0,
    price: 0,
    qty: 0,
    sold: 0,
  });
  const [editedProduct, setEditedProduct] = useState(null);

  // Delete/Undo logic
  const [deletedProduct, setDeletedProduct] = useState(null);
  const [undoTimer, setUndoTimer] = useState(10);

  // Success banner
  const [showSuccess, setShowSuccess] = useState(false);

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  // === Effects ===
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('searchQuery', searchQuery);
  }, [products, searchQuery]);

  // Undo timer logic
  useEffect(() => {
    if (undoTimer > 0 && deletedProduct) {
      const timer = setTimeout(() => setUndoTimer(undoTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (undoTimer === 0) {
      // Once we hit 0, the product is permanently removed
      setDeletedProduct(null);
    }
  }, [undoTimer, deletedProduct]);

  // === Filtering for search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // === Helper: margin calculation
  const calculateMargin = (product) => {
    const cost = Number(product.costPrice) || 0;
    const price = Number(product.price) || 0;
    const sold = Number(product.sold) || 0;

    const totalRevenue = price * sold;
    const totalCost = cost * sold;
    const marginAmount = totalRevenue - totalCost;
    const marginPercentage =
      totalCost > 0 ? ((marginAmount / totalCost) * 100).toFixed(2) : '0.00';

    return {
      marginAmount: marginAmount.toFixed(2),
      marginPercentage,
      totalRevenue: totalRevenue.toFixed(2),
      totalCost: totalCost.toFixed(2),
    };
  };

  // === Form validation
  const validateForm = (product) => {
    const errors = {};
    if (!product.code.trim()) errors.code = 'Code is required';
    if (!product.name.trim()) errors.name = 'Name is required';
    if (!product.category) errors.category = 'Category is required';
    if (product.price <= 0) errors.price = 'Price must be > 0';
    if (product.costPrice < 0) errors.costPrice = 'Cost cannot be negative';
    if (product.qty < 0) errors.qty = 'Quantity cannot be negative';
    if (product.sold < 0) errors.sold = 'Sold cannot be negative';
    return errors;
  };

  // === Delete a product
  const handleDelete = (code) => {
    const productToDelete = products.find((p) => p.code === code);
    setDeletedProduct(productToDelete);
    setProducts(products.filter((p) => p.code !== code));
    setUndoTimer(10); // 10-second timer
  };

  // === Undo delete
  const handleUndoDelete = () => {
    if (deletedProduct) {
      // Add it back and sort by code
      const updated = [...products, deletedProduct].sort((a, b) =>
        a.code.localeCompare(b.code)
      );
      setProducts(updated);
      setDeletedProduct(null);
    }
  };

  // === Add a new product
  const handleAddProduct = () => {
    const errors = validateForm(newProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Add product, sort by code
    const updated = [...products, newProduct].sort((a, b) =>
      a.code.localeCompare(b.code)
    );
    setProducts(updated);

    // Reset fields
    setNewProduct({
      code: '',
      name: '',
      category: '',
      costPrice: 0,
      price: 0,
      qty: 0,
      sold: 0,
    });
    setFormErrors({});
    setIsModalOpen(false);

    // Success banner
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // === Edit an existing product
  const handleEdit = (product) => {
    setEditedProduct({ ...product });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // === Save edited product
  const handleSaveEdit = () => {
    const errors = validateForm(editedProduct);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updated = products.map((p) =>
      p.code === editedProduct.code ? editedProduct : p
    );
    setProducts(updated);

    // Cleanup
    setEditedProduct(null);
    setIsModalOpen(false);

    // Success banner
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // === OnChange for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric fields
    const numericFields = ['costPrice', 'price', 'qty', 'sold'];
    const newValue = numericFields.includes(name) ? parseFloat(value) || 0 : value;

    if (editedProduct) {
      setEditedProduct((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header and "Add Product" Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditedProduct(null);
            setFormErrors({});
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search inventory..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const {
                marginAmount,
                marginPercentage,
                totalRevenue,
                totalCost,
              } = calculateMargin(product);

              return (
                <tr key={product.code}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {product.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{product.costPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.sold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{totalRevenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{totalCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{marginAmount} ({marginPercentage}%)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-purple-600 hover:text-purple-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.code)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editedProduct ? 'Edit Product' : 'Add Product'}
            </h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                {/* Code */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Code *
                  </label>
                  <input
                    name="code"
                    value={editedProduct?.code || newProduct.code}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.code ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.code && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.code}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={editedProduct?.name || newProduct.name}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Category (Dropdown) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={editedProduct?.category || newProduct.category}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {/* We'll offer all categories from your external file */}
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    min="0"
                    step="0.01"
                    value={editedProduct?.costPrice || newProduct.costPrice}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.costPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.costPrice && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.costPrice}
                    </p>
                  )}
                </div>

                {/* Selling Price */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Selling Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={editedProduct?.price || newProduct.price}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.price}
                    </p>
                  )}
                </div>

                {/* Sold Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sold Quantity
                  </label>
                  <input
                    type="number"
                    name="sold"
                    min="0"
                    value={editedProduct?.sold || newProduct.sold}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.sold ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.sold && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.sold}
                    </p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="qty"
                    min="0"
                    value={editedProduct?.qty || newProduct.qty}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      formErrors.qty ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.qty && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.qty}
                    </p>
                  )}
                </div>

                {/* Live Margin Preview */}
                <div className="p-3 bg-gray-100 rounded">
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span>
                      ₹
                      {calculateMargin(editedProduct || newProduct).totalRevenue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Cost:</span>
                    <span>
                      ₹
                      {calculateMargin(editedProduct || newProduct).totalCost}
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Margin:</span>
                    <span>
                      ₹
                      {calculateMargin(editedProduct || newProduct)
                        .marginAmount}{' '}
                      (
                      {
                        calculateMargin(editedProduct || newProduct)
                          .marginPercentage
                      }
                      %)
                    </span>
                  </div>
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
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editedProduct ? handleSaveEdit : handleAddProduct}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Undo Delete Notification */}
      {deletedProduct && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md">
          <p>Deleted: {deletedProduct.name}</p>
          <p>Time left: {undoTimer}s</p>
          <button
            onClick={handleUndoDelete}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Undo
          </button>
        </div>
      )}

      {/* Success Banner */}
      {showSuccess && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-md flex items-center gap-2">
          <CheckCircle />
          <span>
            Product {editedProduct ? 'updated' : 'added'} successfully!
          </span>
        </div>
      )}
    </div>
  );
};
