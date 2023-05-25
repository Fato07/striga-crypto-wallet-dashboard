import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import SwapExchange from '@/components/SwapExchange';
import Wallets from '@/components/Wallets';

const Index = () => {
  const [kycStatus, setKycStatus] = useState(false);

  const approveKYCData = async () => {
    const data = {
      userId: '7b035cb7-bb3d-4347-a335-c431935446ac',
    };
    try {
      const response = await axios.post('/api/startKyc', data);
      setKycStatus(response.data.success)
    } catch (error) {
      console.error('Error approving KYC data:', error);
    }
  };

  return (
    <div>
      {!kycStatus && (
        <>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={approveKYCData}
          >
            Approve KYC Data
          </button>
        </>
      )}
      {kycStatus && (
        <>
          <Header />
          <Wallets />
          <SwapExchange />
        </>
      )}
    </div>
  );
};

export default Index;
