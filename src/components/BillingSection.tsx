import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { ProductCard } from './ProductCard';
import { categories } from '../data/categories';
import { initialProducts } from '../data/products';
import shopLogo from '../Images/Shop.jpg';

export const BillingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [billItems, setBillItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts.length > 0 ? savedProducts : initialProducts);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('dailySales')) {
      localStorage.setItem('dailySales', '0');
    }
    if (!localStorage.getItem('totalSales')) {
      localStorage.setItem('totalSales', '0');
    }
    if (!localStorage.getItem('totalProductSaleCount')) {
      localStorage.setItem('totalProductSaleCount', '0');
    }
    checkAndResetDailySales();
  }, []);

  const checkAndResetDailySales = () => {
    const now = new Date();
    const lastResetDate = localStorage.getItem('lastSalesResetDate');
    const currentDate = now.toDateString();
    
    if (lastResetDate !== currentDate) {
      localStorage.setItem('dailySales', '0');
      localStorage.setItem('lastSalesResetDate', currentDate);
    }
  };

  const paymentMethods = [
    { value: "Cash", label: "Cash" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "UPI", label: "UPI" },
    { value: "Net Banking", label: "Net Banking" }
  ];

  const termsAndConditions = [
    "All sales are final. No returns or exchanges unless defective.",
    "Defective items must be reported within 3 days of purchase.",
    "Original receipt required for any returns or exchanges.",
    "Prices are inclusive of all taxes.",
    "For card payments, customer must present the same card used for payment if return is needed.",
    "Store credit will be issued for approved returns.",
    "Special orders and customized items cannot be returned.",
    "The management reserves the right to refuse service.",
    "Promotional discounts cannot be combined with other offers.",
    "All electronic payments are subject to bank processing fees (if applicable)."
  ];

  const filteredProducts = selectedCategory === "All Products" 
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products.filter(p => p.category === selectedCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToBill = (product: any) => {
    if (product.qty <= 0) {
      alert('This product is out of stock!');
      return;
    }

    setBillItems(prev => {
      const existing = prev.find(item => item.code === product.code);
      if (existing) {
        return prev.map(item => 
          item.code === product.code 
            ? { ...item, quantity: Math.min(item.quantity + 1, product.qty) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, discount: 0 }];
    });
  };

  const updateItemDiscount = (code: string, discount: number) => {
    setBillItems(prev => 
      prev.map(item => 
        item.code === code 
          ? { ...item, discount: Math.min(Math.max(0, discount), 100) }
          : item
      )
    );
  };

  const updateItemQuantity = (code: string, quantity: number) => {
    setBillItems(prev => 
      prev.map(item => {
        if (item.code === code) {
          const product = products.find(p => p.code === code);
          const maxQty = product ? product.qty : 0;
          return { ...item, quantity: Math.min(Math.max(1, quantity), maxQty) };
        }
        return item;
      })
    );
  };

  const removeItem = (code: string) => {
    setBillItems(prev => prev.filter(item => item.code !== code));
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    billItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      const discountAmount = itemTotal * (item.discount / 100);
      subtotal += itemTotal - discountAmount;
      totalDiscount += discountAmount;
    });

    const tax = subtotal * 0.05;
    const grandTotal = subtotal + tax;

    return { subtotal, totalDiscount, tax, grandTotal };
  };

  const handleProceedToPayment = () => {
    const customerName = document.getElementById('customerName') as HTMLInputElement;
    
    if (!customerName.value) {
      alert('Please enter customer name');
      return;
    }

    if (billItems.length === 0) {
      alert('Please add items to the bill');
      return;
    }

    setShowPaymentConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const now = new Date();
      const formattedBillNumber = `${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${now.getFullYear()}`;

      const totals = calculateTotals();
      const customerName = document.getElementById('customerName') as HTMLInputElement;
      const customerPhone = document.getElementById('customerPhone') as HTMLInputElement;

      const billData = {
        billNumber: formattedBillNumber,
        date: now.toISOString(),
        customerName: customerName.value,
        customerPhone: customerPhone.value,
        paymentMethod: paymentMethod,
        items: billItems,
        ...totals
      };

      // Save bill to localStorage
      const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
      savedBills.push(billData);
      localStorage.setItem('bills', JSON.stringify(savedBills));

      // Update product quantities
      const updatedProducts = [...products];
      billItems.forEach(item => {
        const product = updatedProducts.find(p => p.code === item.code);
        if (product) {
          product.qty -= item.quantity;
          product.sold = (product.sold || 0) + item.quantity;
        }
      });
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Update sales data
      updateSalesData(billData.grandTotal, billItems.reduce((acc, item) => acc + item.quantity, 0));

      // Generate and download PDF
      await generateAndDownloadPDF(billData);

      // Reset form
      customerName.value = '';
      customerPhone.value = '';
      setBillItems([]);
      setPaymentMethod("Cash");
      setShowPaymentConfirmation(false);

      // Show success message
      alert('Bill generated successfully!');
    } catch (error) {
      console.error('Error during payment confirmation:', error);
      alert('Failed to generate bill. Please try again.');
    }
  };

  const updateSalesData = (grandTotal: number, itemsCount: number) => {
    // Update daily sales
    const currentDailySales = parseFloat(localStorage.getItem('dailySales') || '0');
    const updatedDailySales = currentDailySales + grandTotal;
    localStorage.setItem('dailySales', updatedDailySales.toString());

    // Update total sales
    const currentTotalSales = parseFloat(localStorage.getItem('totalSales') || '0');
    const updatedTotalSales = currentTotalSales + grandTotal;
    localStorage.setItem('totalSales', updatedTotalSales.toString());

    // Update total product sale count
    const totalProductSaleCount = parseInt(localStorage.getItem('totalProductSaleCount') || '0', 10) + itemsCount;
    localStorage.setItem('totalProductSaleCount', totalProductSaleCount.toString());

    // Trigger storage event to update other components
    window.dispatchEvent(new Event('storage'));
  };

  const generateAndDownloadPDF = async (billData: any) => {
    return new Promise<void>((resolve, reject) => {
      try {
        const doc = new jsPDF();
        
        // Add logo
        const logoWidth = 30;
        const pageWidth = doc.internal.pageSize.getWidth();
        const rightMargin = 14;
        const logoX = pageWidth - logoWidth - rightMargin;
        
        // Convert image to base64 if needed
        const img = new Image();
        img.src = shopLogo;
        img.onload = () => {
          try {
            doc.addImage(img, 'JPEG', logoX, 10, logoWidth, logoWidth * (img.height / img.width));
            
            // Shop details
            doc.setFontSize(18);
            doc.setTextColor(40, 40, 150);
            doc.setFont('helvetica', 'bold');
            doc.text("Lakshmi's Sarees (COOL COTTON HUB)", 105, 25, { align: 'center' });

            doc.setFontSize(12);
            doc.setTextColor(80, 80, 80);
            doc.setFont('helvetica', 'normal');
            doc.text('No.19/7C,8th Street,Nanganallur, Chennai - 600061', 105, 32, { align: 'center' });
            doc.text('Phone: +91 7305254405 +91 9962636916', 105, 39, { align: 'center' });
            
            doc.setDrawColor(200, 200, 200);
            doc.line(14, 45, 196, 45);

            // Bill details
            doc.setFontSize(14);
            doc.setTextColor(40, 40, 40);
            doc.text(`Bill No: ${billData.billNumber}`, 14, 53);
            doc.text(`Date: ${new Date(billData.date).toLocaleDateString('en-IN')}`, 14, 60);
            doc.text(`Customer: ${billData.customerName}`, 14, 67);
            if (billData.customerPhone) {
              doc.text(`Phone: ${billData.customerPhone}`, 14, 74);
            }
            doc.text(`Payment Method: ${billData.paymentMethod}`, 14, billData.customerPhone ? 81 : 74);

            // Items table headers
            const headers = ['Item', 'Price', 'Qty', 'Discount', 'Total'];
            const columnPositions = [14, 70, 100, 130, 160];

            doc.setFont('helvetica', 'bold');
            headers.forEach((header, index) => {
              doc.text(header, columnPositions[index], 95);
            });
            doc.setFont('helvetica', 'normal');
            doc.line(14, 98, 196, 98);

            // Items list
            let yPosition = 105;
            billData.items.forEach((item: any) => {
              doc.text(item.name.substring(0, 20), columnPositions[0], yPosition);
              doc.text(`Rs. ${item.price.toFixed(2)}`, columnPositions[1], yPosition);
              doc.text(item.quantity.toString(), columnPositions[2], yPosition);
              doc.text(`${item.discount}%`, columnPositions[3], yPosition);
              doc.text(`Rs. ${(item.price * item.quantity * (1 - item.discount / 100)).toFixed(2)}`, columnPositions[4], yPosition);
              yPosition += 7;
            });

          // Totals
yPosition += 10;
doc.setFontSize(12);
doc.text(`Subtotal: Rs. ${billData.subtotal.toFixed(2)}`, 160, yPosition, { align: 'right' });
yPosition += 7;
doc.text(`Total Discount: Rs. ${billData.totalDiscount.toFixed(2)}`, 160, yPosition, { align: 'right' });
// Removed tax calculation and display
yPosition += 10;
doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text(`Grand Total: Rs. ${billData.grandTotal.toFixed(2)}`, 160, yPosition, { align: 'right' });
doc.setFont('helvetica', 'normal');

            // Terms and conditions
            yPosition += 20;
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Terms and Conditions:', 14, yPosition);
            yPosition += 7;

            termsAndConditions.forEach((term, index) => {
              if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
              }
              doc.text(`${index + 1}. ${term}`, 20, yPosition);
              yPosition += 7;
            });

            // Footer
            yPosition = 280;
            doc.setFontSize(12);
            doc.setTextColor(40, 40, 40);
            doc.text('Thank you for your purchase!', 105, yPosition, { align: 'center' });
            yPosition += 7;
            doc.text('Please visit us again', 105, yPosition, { align: 'center' });

            // Save PDF
            doc.save(`Bill_${billData.billNumber}.pdf`);
            resolve();
          } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
          }
        };
        img.onerror = (error) => {
          console.error('Error loading logo:', error);
          reject(error);
        };
      } catch (error) {
        console.error('Error in PDF generation:', error);
        reject(error);
      }
    });
  };

  return (
    <div className="grid grid-cols-[200px_1fr_400px] gap-4 p-4">
      {/* Categories Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category}
              className={`w-full text-left px-3 py-2 rounded ${selectedCategory === category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-4">Products</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.code} product={product} onSelect={addToBill} />
          ))}
        </div>
      </div>

      {/* Current Bill Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-lg mb-4">Current Bill</h2>
        <div className="mb-4">
          <input
            type="text"
            id="customerName"
            placeholder="Customer Name *"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            id="customerPhone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Payment Method *</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {billItems.length === 0 ? (
          <p className="text-gray-500">No items added to bill</p>
        ) : (
          <div className="space-y-4">
            {/* Bill items list */}
            {billItems.map(item => (
              <div key={item.code} className="border rounded p-3">
                {/* Item details */}
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Rs. {item.price}</div>
                  </div>
                  <button
                    onClick={() => removeItem(item.code)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                {/* Quantity and discount controls */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Qty:</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.code, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded"
                      min="1"
                      max={item.qty}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Discount:</span>
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateItemDiscount(item.code, parseInt(e.target.value))}
                      className="w-16 p-1 border rounded"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm ml-1">%</span>
                  </div>
                  <div className="flex-1 text-right font-bold">
                    Rs. {(item.price * item.quantity * (1 - item.discount/100)).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}

            {/* Totals section */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {calculateTotals().subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Discount:</span>
                <span>Rs. {calculateTotals().totalDiscount.toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Tax (5%):</span>
                <span>Rs. {calculateTotals().tax.toFixed(2)}</span>
              </div> */}
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>Rs. {calculateTotals().grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment buttons */}
            {!showPaymentConfirmation ? (
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 text-yellow-800 rounded text-center">
                  Confirm payment via {paymentMethod}?
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowPaymentConfirmation(false)}
                    className="bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Confirm & Download
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};