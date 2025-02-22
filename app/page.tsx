'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BitcoinConnectClientWrapper } from './components/bitcoinConnectClientWrapper';

export default function Home() {
  const router = useRouter();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleCharacterSelect = (type: 'father' | 'mother') => {
    if (!isWalletConnected) return;
    
    console.log('Selected:', type);
    // Store the selection in localStorage or similar if needed
    localStorage.setItem('userType', type);
    // Route to the next page (parent dashboard)
    router.push(`/dashboard/${type}`);
  };

  const CharacterButton = ({ type, image, title, bgColor }: {
    type: 'father' | 'mother',
    image: string,
    title: string,
    bgColor: string
  }) => (
    <button 
      onClick={() => handleCharacterSelect(type)}
      className={`
        group relative w-full
        ${isWalletConnected 
          ? 'cursor-pointer hover:scale-105' 
          : 'opacity-50 cursor-not-allowed'
        }
        transition-all duration-200
      `}
      disabled={!isWalletConnected}
    >
      <div className={`
        ${bgColor} rounded-full p-4 w-32 h-32 mx-auto
        border-4 border-black transition-all duration-200
        ${isWalletConnected ? `group-hover:${bgColor.replace('bg-', 'bg-')}-700` : ''}
      `}>
        <Image
          src={image}
          width={100}
          height={100}
          alt={title}
          className="rounded-full"
          priority
        />
      </div>
      <span className="bg-black text-white px-4 py-1 rounded-full 
        absolute left-1/2 -translate-x-1/2 -bottom-2">
        {title}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4"
      style={{
        backgroundImage: 'url(/background2.svg)',
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/logotransparent.png"
            width={300}
            height={100}
            alt="Money Badger"
            priority
          />
          <p className="text-lg text-brown-800 mt-2">
            Bitcoin to kids
          </p>
        </div>

        {/* Wallet Status */}
        <div>
          {isWalletConnected ? (
            <div className="bg-blue-500 text-white px-6 py-2 rounded-full">
              Connected
            </div>
          ) : (
            <BitcoinConnectClientWrapper onConnect={handleWalletConnect} />
          )}
        </div>

        {/* Character Buttons */}
        <div className="flex flex-col gap-6 w-full">
          <CharacterButton
            type="father"
            image="/bicho1.jpg"
            title="Daddy Badger"
            bgColor="bg-blue-600"
          />
          
          <CharacterButton
            type="mother"
            image="/bicho2.jpg"
            title="Mommy Badger"
            bgColor="bg-pink-500"
          />
        </div>
      </div>
    </div>
  );
}