// src/services/dataService.ts
interface Product {
                    code: string;
                    name: string;
                    price: number;
                    category: string;
                    qty: number;
                    sold: number;
                  }
                  
                  interface Bill {
                    billNumber: string;
                    date: string;
                    customer: {
                      name: string;
                      phone: string;
                    };
                    paymentMethod: string;
                    items: {
                      code: string;
                      name: string;
                      price: number;
                      quantity: number;
                      discount: number;
                    }[];
                    subtotal: number;
                    totalDiscount: number;
                    tax: number;
                    grandTotal: number;
                  }
                  
                  const PRODUCTS_KEY = 'inventory_products';
                  const BILLS_KEY = 'inventory_bills';
                  
                  export const getProducts = async (): Promise<Product[]> => {
                    try {
                      const data = localStorage.getItem(PRODUCTS_KEY);
                      return data ? JSON.parse(data) : null;
                    } catch (error) {
                      console.error('Error getting products:', error);
                      return [];
                    }
                  };
                  
                  export const saveProducts = async (products: Product[]): Promise<void> => {
                    try {
                      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
                    } catch (error) {
                      console.error('Error saving products:', error);
                      throw error;
                    }
                  };
                  
                  export const getBills = async (): Promise<Bill[]> => {
                    try {
                      const data = localStorage.getItem(BILLS_KEY);
                      return data ? JSON.parse(data) : [];
                    } catch (error) {
                      console.error('Error getting bills:', error);
                      return [];
                    }
                  };
                  
                  export const saveBills = async (bills: Bill[]): Promise<void> => {
                    try {
                      localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
                    } catch (error) {
                      console.error('Error saving bills:', error);
                      throw error;
                    }
                  };