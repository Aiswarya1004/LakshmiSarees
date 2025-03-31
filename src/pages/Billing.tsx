import React from 'react';
import { BillingSection } from '../components/BillingSection';

export const Billing = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Billing</h1>
      <BillingSection />
    </div>
  );
};