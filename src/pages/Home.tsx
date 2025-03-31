import React, { useEffect, useState } from 'react';
import { ShoppingBag, TrendingUp, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [dailySales, setDailySales] = useState<string>('₹0');

  // Function to format and update daily sales
  const updateDailySalesDisplay = () => {
    const dailySalesValue = localStorage.getItem('dailySales');
    setDailySales(dailySalesValue ? `₹${parseFloat(dailySalesValue).toFixed(2)}` : '₹0');
  };

  // Check and reset daily sales if needed (between 12 AM and 6 AM)
  const checkAndResetDailySales = () => {
    const now = new Date();
    const hours = now.getHours();
    const lastResetDate = localStorage.getItem('lastSalesResetDate');
    
    if ((hours >= 0 && hours < 6) && lastResetDate !== now.toDateString()) {
      localStorage.setItem('dailySales', '0');
      localStorage.setItem('lastSalesResetDate', now.toDateString());
      setDailySales('₹0');
    }
  };

  useEffect(() => {
    // Initial load
    updateDailySalesDisplay();
    checkAndResetDailySales();
    
    // Listen for storage events
    const handleStorageChange = () => {
      updateDailySalesDisplay();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check every hour if we need to reset
    const interval = setInterval(() => {
      checkAndResetDailySales();
      updateDailySalesDisplay();
    }, 60 * 60 * 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: 'Total Products', value: '200+', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Daily Sales', value: dailySales, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Categories', value: '6', icon: Package, color: 'bg-purple-500' },
    { label: 'Customers', value: '1000+', icon: Users, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Lakshmi's Saree Silks</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your one-stop destination for premium silk sarees, blouses, and traditional wear.
          Manage your inventory, track sales, and grow your business with our comprehensive system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-md p-6">
            <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-gray-600 text-sm">{label}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/billing"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Billing</h3>
          <p className="text-gray-600">Create new bills and manage transactions efficiently.</p>
        </Link>

        <Link
          to="/inventory"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Inventory Management</h3>
          <p className="text-gray-600">Track stock levels and manage your product inventory.</p>
        </Link>

        <Link
          to="/analytics"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sales Analytics</h3>
          <p className="text-gray-600">View detailed reports and analyze business performance.</p>
        </Link>
      </div>
    </div>
  );
};