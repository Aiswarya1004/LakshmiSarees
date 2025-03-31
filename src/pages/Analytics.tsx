import React, { useEffect, useState } from 'react';
import { TrendingUp, Package, AlertTriangle, DollarSign, BarChart2, Zap, Check } from 'lucide-react';

export const Analytics = () => {
  const [totalSold, setTotalSold] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);

  useEffect(() => {
    // Fetch products from localStorage with proper fallback
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);

    // Calculate business metrics
    const currentTotalSaleCount = parseInt(localStorage.getItem('totalProductSaleCount') || '0', 10);
    setTotalSold(currentTotalSaleCount);
    
    // Calculate total revenue from sold products
    const revenue = savedProducts.reduce((acc: number, product: any) => 
      acc + (product.price * product.sold), 0);
    setTotalRevenue(revenue);
    
    // Calculate profit margin
    const totalCost = savedProducts.reduce((acc: number, product: any) => 
      acc + (product.costPrice * product.sold), 0);
    const margin = totalCost > 0 ? ((revenue - totalCost) / revenue) * 100 : 0;
    setProfitMargin(margin);
  }, []);

  // Calculate inventory metrics
  const totalValue = products.reduce((acc: number, product: any) => 
    acc + product.price * product.qty, 0);
  const totalCostValue = products.reduce((acc: number, product: any) => 
    acc + product.costPrice * product.qty, 0);
  const lowStock = products.filter((product: any) => product.qty <= 3).length;
  const outOfStock = products.filter((product: any) => product.qty === 0).length;

  // Enhanced top selling products calculation
  const topSellingProducts = products
    .filter((product: any) => product.sold > 0)
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5);

  // Fast moving products (sold more than 5 items)
  const fastMovingProducts = products
    .filter((product: any) => product.sold >= 5)
    .sort((a: any, b: any) => b.sold - a.sold);

  // Calculate category distribution
  const categoryDistribution = products.reduce((acc: Record<string, number>, product: any) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { 
      label: 'Total Products', 
      value: products.length, 
      icon: Package, 
      color: 'bg-blue-500',
      description: 'Total inventory items'
    },
    { 
      label: 'Stock Value', 
      value: `₹${totalValue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'bg-green-500',
      description: `Cost: ₹${totalCostValue.toLocaleString()}`
    },
    { 
      label: 'Low Stock', 
      value: `${lowStock} (${outOfStock} out)`, 
      icon: AlertTriangle, 
      color: 'bg-yellow-500',
      description: 'Items needing restock'
    },
    { 
      label: 'Total Sold', 
      value: totalSold, 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      description: `Revenue: ₹${totalRevenue.toLocaleString()}`
    },
    {
      label: 'Profit Margin',
      value: `${profitMargin.toFixed(2)}%`,
      icon: BarChart2,
      color: 'bg-indigo-500',
      description: 'Overall business margin'
    },
    {
      label: 'Fast Movers',
      value: fastMovingProducts.length,
      icon: Zap,
      color: 'bg-red-500',
      description: 'High demand products'
    }
  ];

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Business Analytics Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(({ label, value, icon: Icon, color, description }) => (
          <div key={label} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className={`${color} w-10 h-10 rounded-full flex items-center justify-center mr-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{description}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
            <span className="text-sm text-gray-500">By units sold</span>
          </div>
          <div className="space-y-4">
            {topSellingProducts.length > 0 ? (
              topSellingProducts.map((product: any) => (
                <div key={product.code} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded">
                  <div className="flex items-center">
                    <div className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      {product.sold}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category} • {product.code}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{(product.price * product.sold).toLocaleString()}</div>
                    <div className="text-sm text-green-600">
                      ₹{product.price - product.costPrice} profit per unit
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2">No sales data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Alerts</h2>
            <div className="space-y-3">
              {products.filter((p: any) => p.qty <= 3).length > 0 ? (
                products
                  .filter((product: any) => product.qty <= 3)
                  .sort((a: any, b: any) => a.qty - b.qty)
                  .map((product: any) => (
                    <div key={product.code} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-gray-800">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.code}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.qty === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.qty === 0 ? 'OUT OF STOCK' : `${product.qty} LEFT`}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Check className="mx-auto h-6 w-6 text-green-500" />
                  <p className="mt-2">All products have sufficient stock</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory by Category</h2>
            <div className="space-y-2">
              {Object.entries(categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600 truncate">{category}</div>
                  <div className="flex-1 mx-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${((count as number) / products.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium w-8 text-right">{count as number}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fast Moving Products */}
      {fastMovingProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Fast Moving Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fastMovingProducts.map((product: any) => (
              <div key={product.code} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                    {product.sold} sold
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm">Profit: ₹{product.price - product.costPrice}</span>
                  <span className="text-sm font-semibold">
                    {((product.price - product.costPrice) / product.costPrice * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};