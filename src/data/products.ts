// products.ts (or products.js if you're using JavaScript)
export const initialProducts = [
  // Blouse Products
  { code: "NB-1", name: "4689 Cotton Blouse", price: 65, category: "Blouses", qty: 100, sold: 0 },
  { code: "NB-2", name: "4689 Cotton Blouse", price: 85, category: "Blouses", qty: 100, sold: 0 },
  { code: "NB-3", name: "Aravind Cotton Blouse", price: 100, category: "Blouses", qty: 100, sold: 0 },
  { code: "KB-1", name: "Kalamkari Blouse", price: 65, category: "Blouses", qty: 50, sold: 0 },
  { code: "KB-2", name: "Kalamkari Blouse", price: 100, category: "Blouses", qty: 75, sold: 0 },
  { code: "NB-4", name: "1.25m Cotton Blouse", price: 140, category: "Blouses", qty: 10, sold: 0 },
  { code: "KB-3", name: "Kalamkari Blouse", price: 140, category: "Blouses", qty: 25, sold: 0 },

  // ====== SAREES ======
  // KHP Series
  { code: "KHP01-06", name: "Ekkath kotta Saree", price: 840, category: "Sarees", qty: 6, sold: 0 },
  { code: "KHP02-1-10", name: "Ekkath kotta Saree", price: 680, category: "Sarees", qty: 10, sold: 0 },
  { code: "KHP3-1-5", name: "Cotton Saree", price: 1250, category: "Sarees", qty: 5, sold: 0 },
  { code: "KHP3-6-11", name: "Cotton Saree", price: 1350, category: "Sarees", qty: 6, sold: 0 },

  // LTN Series
  { code: "LTN-2646-1-5", name: "Zari Border Saree", price: 780, category: "Sarees", qty: 5, sold: 0 },
  { code: "LTN-8790-1-2", name: "Zari Border Saree", price: 920, category: "Sarees", qty: 2, sold: 0 },
  { code: "LTN-9227-1-5", name: "Zari Border Saree", price: 750, category: "Sarees", qty: 5, sold: 0 },
  { code: "LTN-6551-4", name: "Muthukattam Saree", price: 900, category: "Sarees", qty: 4, sold: 0 },
  { code: "LTN-6091-10", name: "Plain Kanchi Border", price: 600, category: "Sarees", qty: 10, sold: 0 },
  { code: "LTN-9430-6", name: "Plain Kanchi Border", price: 1100, category: "Sarees", qty: 6, sold: 0 },
  { code: "LTN-1084-5", name: "Butta Kanchi Border", price: 1000, category: "Sarees", qty: 5, sold: 0 },
  { code: "LTN-6870-8", name: "Butta Kanchi Border", price: 970, category: "Sarees", qty: 8, sold: 0 },
  { code: "LTN-5977-5", name: "Agarlic Cotton Silk", price: 1550, category: "Sarees", qty: 5, sold: 0 },
  { code: "LTN-8739-5", name: "Agarlic Seer Pallu", price: 1700, category: "Sarees", qty: 5, sold: 0 },
  { code: "LTN-9604-5", name: "Agarlic Cotton Butta", price: 3450, category: "Sarees", qty: 5, sold: 0 },

  // RVV Series
  { code: "RVV-1-14", name: "Kalyani Cotton", price: 850, category: "Sarees", qty: 14, sold: 0 },
  { code: "RVV-2-7", name: "Kalyani Big Border", price: 900, category: "Sarees", qty: 7, sold: 0 },
  { code: "RVV-3-13", name: "Zari Border", price: 1100, category: "Sarees", qty: 13, sold: 0 },
  { code: "RVV-4-5", name: "Muthukattam", price: 1090, category: "Sarees", qty: 5, sold: 0 },
  { code: "RVV-5-7", name: "Plain Kanchi", price: 1650, category: "Sarees", qty: 8, sold: 0 },
  { code: "RVV-6-8", name: "Plain Kanchi", price: 1800, category: "Sarees", qty: 8, sold: 0 },
  { code: "RVV-7-1", name: "Butta Kanchi", price: 1600, category: "Sarees", qty: 1, sold: 0 },

  // SSE Series
  { code: "SSE-0205", name: "Pathik Saree", price: 850, category: "Sarees", qty: 1, sold: 0 },
  { code: "SSE-19", name: "Mallika 5.50 Mtr", price: 550, category: "Sarees", qty: 20, sold: 0 },
  { code: "SSE-013", name: "Pathik Chudi", price: 1400, category: "Sarees", qty: 1, sold: 0 },
  { code: "SSE-0166", name: "Pathik Chudi", price: 1090, category: "Sarees", qty: 2, sold: 0 },
  { code: "SSE-0204", name: "Pathik Saree", price: 1650, category: "Sarees", qty: 3, sold: 0 },
  { code: "SSE-0200", name: "Pathik Saree", price: 750, category: "Sarees", qty: 1, sold: 0 },
  { code: "SSE-145", name: "Malliga Cool", price: 585, category: "Sarees", qty: 10, sold: 0 },
  { code: "SSE-199", name: "Malliga Cool", price: 1000, category: "Sarees", qty: 9, sold: 0 },
  { code: "SSE-093", name: "SSS Kotta", price: 600, category: "Sarees", qty: 10, sold: 0 },
  { code: "SSE-95", name: "Jaikali", price: 600, category: "Sarees", qty: 5, sold: 0 },

  // SSSK Series
  { code: "SSSK-1-8", name: "Ekkath Kotta", price: 950, category: "Sarees", qty: 8, sold: 0 },
  { code: "SSSK-2-1-20", name: "Ekkath Kotta", price: 1550, category: "Sarees", qty: 20, sold: 0 },

  // VWCS Series
  { code: "VWCS-1-1-2", name: "Zari Border", price: 1150, category: "Sarees", qty: 2, sold: 0 },
  { code: "VWCS-1-1-3-4", name: "Zari Border", price: 1250, category: "Sarees", qty: 2, sold: 0 },
  { code: "VWCS-1-1-5-7", name: "Zari Border", price: 1300, category: "Sarees", qty: 3, sold: 0 },
  { code: "VWCS-2-1-6", name: "Muthukattam", price: 1390, category: "Sarees", qty: 6, sold: 0 },
  { code: "VWCS-3-1-15", name: "Plain Kanchi", price: 1650, category: "Sarees", qty: 15, sold: 0 },
  { code: "VWCS-3-16=20", name: "Plain Kanchi", price: 1570, category: "Sarees", qty: 5, sold: 0 },
  { code: "VWCS-4-1-7", name: "Butta Kanchi", price: 1600, category: "Sarees", qty: 5, sold: 0 },
  { code: "VWCS-4-8-10", name: "Butta Kanchi", price: 1720, category: "Sarees", qty: 5, sold: 0 },
  { code: "VWCS-5-1-14", name: "Agarlic Silk", price: 1360, category: "Sarees", qty: 14, sold: 0 },
  { code: "VWCS-6-1-7", name: "Seer Pallu", price: 1260, category: "Sarees", qty: 7, sold: 0 },
  { code: "VWCS-7-1-2", name: "Agarlic Butta", price: 1500, category: "Sarees", qty: 2, sold: 0 },
  { code: "VWCS-8-1-3", name: "Vaiaroosi", price: 1800, category: "Sarees", qty: 3, sold: 0 },
  { code: "VWCS-9-1-14", name: "Kattam Butta", price: 1850, category: "Sarees", qty: 14, sold: 0 },
  { code: "VWCS-10-1-8", name: "Muthukattam", price: 2000, category: "Sarees", qty: 8, sold: 0 },
  { code: "VWCS-11-1-5", name: "Plain Araimadam", price: 2100, category: "Sarees", qty: 5, sold: 0 },
  { code: "VWCS-12-1-4", name: "Plain Kanchi", price: 2450, category: "Sarees", qty: 4, sold: 0 },

  // MG Series (Sarees)
  { code: "MG-1324-1", name: "Cotton Saree", price: 1450, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1324-2", name: "Cotton Saree", price: 1450, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1030-1", name: "Cotton Saree", price: 1800, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1030-2", name: "Cotton Saree", price: 1800, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1004-1", name: "Cotton Saree", price: 2000, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1004-2", name: "Cotton Saree", price: 2000, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1323-1", name: "Cotton Saree", price: 1450, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1323-2", name: "Cotton Saree", price: 1450, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1323-3", name: "Cotton Saree", price: 1450, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1326-1", name: "Cotton Saree", price: 1600, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1326-2", name: "Cotton Saree", price: 1600, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1326-3", name: "Cotton Saree", price: 1600, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1326-4", name: "Cotton Saree", price: 1600, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-1326-5", name: "Cotton Saree", price: 1600, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-1", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-2", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-3", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-4", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-5", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-6", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-8", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-9", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },
  { code: "MG-K3-10", name: "Cotton Saree", price: 570, category: "Sarees", qty: 1, sold: 0 },

  // OS Series (Old Stock)
  { code: "OS-1", name: "Kalyani Cotton", price: 900, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-2", name: "Kalyani Cotton", price: 900, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-3", name: "Kalyani Cotton", price: 900, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-4", name: "Kalyani Cotton", price: 850, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-5", name: "Kalyani Cotton", price: 850, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-6", name: "Kalyani Cotton", price: 900, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-7", name: "Kalyani Cotton", price: 1350, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-8", name: "Kalyani Cotton", price: 1350, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-9", name: "Kalyani Cotton", price: 1350, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-10", name: "9 Yards Kalyani", price: 2000, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-11", name: "9 Yards Kalyani", price: 2000, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-12", name: "6 Yards Kalyani", price: 1100, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-13", name: "6 Yards Kalyani", price: 1100, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-14", name: "Kalyani Cotton", price: 1200, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-15", name: "Kalyani Cotton", price: 1200, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-16", name: "Kalyani Cotton", price: 1200, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-17", name: "Kalyani Cotton", price: 450, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-18", name: "Kalyani Cotton", price: 450, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-19", name: "Kalyani Cotton", price: 450, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-20", name: "Kalyani Cotton", price: 450, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-21", name: "Kalyani Cotton", price: 750, category: "Sarees", qty: 1, sold: 0 },
  { code: "OS-22", name: "Kalyani Cotton", price: 750, category: "Sarees", qty: 1, sold: 0 },

  // ====== CHUDIDHARS ======
  // MG Series
  { code: "MG-VC87-1-1", name: "Chudidhar", price: 1400, category: "Chudidhars", qty: 1, sold: 0 },
  { code: "MG-VC87-2-1", name: "Chudidhar", price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
  { code: "MG-VC87-2-2", name: "Chudidhar", price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
  { code: "MG-VC87-2-3", name: "Chudidhar", price: 1200, category: "Chudidhars", qty: 1, sold: 0 },
  { code: "MG-VC87-3-1", name: "Chudidhar", price: 1200, category: "Chudidhars", qty: 1, sold: 0 },

  // SC Series
  { code: "SC-101-1-15", name: "Chudidhar", price: 1000, category: "Chudidhars", qty: 15, sold: 0 },
  { code: "SC-338-5", name: "Chudidhar", price: 1300, category: "Chudidhars", qty: 5, sold: 0 },
  { code: "SC-307-3", name: "Chudidhar", price: 1650, category: "Chudidhars", qty: 3, sold: 0 }
];
