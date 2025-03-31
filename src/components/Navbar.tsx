import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, ShoppingCart, Package, BarChart3, Home } from 'lucide-react';
import logo from '../Images/Shop.jpg'; // Import the logo

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: Store, label: 'Products' },
    { path: '/billing', icon: ShoppingCart, label: 'Billing' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' }
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo */}
            <img
              src={logo} // Use the imported logo path
              alt="Lakshmi's Sarees Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold text-gray-800">Lakshmi's Sarees</span>
          </Link> 
          
          <div className="flex space-x-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(path)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
