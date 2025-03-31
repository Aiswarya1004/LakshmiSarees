import React from 'react';

interface Product {
  code: string;
  name: string;
  price: number;
  category: string;
  qty: number;
  sold: number;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const getStockStatus = () => {
    if (product.qty <= 0) return { text: 'Out of stock', class: 'bg-red-100 text-red-800' };
    if (product.qty <= 3) return { text: 'Low stock', class: 'bg-yellow-100 text-yellow-800' };
    return { text: `${product.qty} in stock`, class: 'bg-green-100 text-green-800' };
  };

  const status = getStockStatus();

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="text-sm font-semibold text-gray-600">{product.code}</div>
      <div className="text-lg font-medium mt-1">{product.name}</div>
      <div className="text-xl font-bold text-green-600 mt-2">₹{product.price}</div>
      <div className="text-sm text-gray-500 mt-1">{product.category}</div>
      <div className={`text-xs px-2 py-1 rounded mt-2 inline-block ${status.class}`}>
        {status.text}
      </div>
    </div>
  );
};