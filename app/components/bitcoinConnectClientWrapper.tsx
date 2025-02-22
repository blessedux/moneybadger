'use client';

import dynamic from 'next/dynamic';
const Button = dynamic(
  () => import('@getalby/bitcoin-connect-react').then((mod) => mod.Button),
  {
    ssr: false,
  }
);
import React, { useState } from 'react';
import { WebLNProvider } from '@webbtc/webln-types';

interface BitcoinConnectClientWrapperProps {
  onConnect?: () => void;
}

export function BitcoinConnectClientWrapper({ onConnect }: BitcoinConnectClientWrapperProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSuccess = async (provider: WebLNProvider) => {
    console.log('Wallet connected successfully in wrapper');
    setIsConnecting(false);
    if (onConnect) {
      onConnect();
    }
  };

  return (
    <Button 
      onSuccess={handleSuccess}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full text-lg"
    />
  );
}