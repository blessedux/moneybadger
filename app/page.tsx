'use client';

import { useState, useEffect } from 'react';
import { ParentDashboard } from './components/dashboard/parent-dashboard';
import { ChildDashboard } from './components/dashboard/child-dashboard';
import { fetchTasks, fetchChildren, updateTaskStatus } from './lib/api';
import { Task, Child } from './types';
import Image from 'next/image'
import {BitcoinConnectClientWrapper} from './components/bitcoinConnectClientWrapper';

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userType, setUserType] = useState<'mother' | 'father' | 'child' | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleWalletConnect = () => {
    console.log('Wallet connected');
    setIsWalletConnected(true);
  };

  // Simplified character selection handler
  const handleCharacterSelect = async (type: 'father' | 'mother') => {
    console.log('Character clicked:', type);
    
    if (!isWalletConnected) {
      console.log('Wallet not connected - cannot select character');
      return;
    }

    try {
      setLoading(true);
      console.log('Setting user type to:', type);
      setUserType(type);
      
      // Load initial data
      const tasksData = await fetchTasks('parent1');
      const childrenData = await fetchChildren('parent1');
      
      setTasks(tasksData);
      setChildren(childrenData);
      setBalance(10000);
      
      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simple character button component
  const CharacterButton = ({ type, image, title, bgColor }: {
    type: 'father' | 'mother',
    image: string,
    title: string,
    bgColor: string
  }) => (
    <button 
      onClick={() => handleCharacterSelect(type)}
      className={`
        w-48 flex flex-col items-center relative 
        ${isWalletConnected ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
      `}
    >
      <div className={`
        ${bgColor} rounded-full p-4 w-32 h-32 
        flex items-center justify-center border-4 border-black
        ${isWalletConnected && 'hover:scale-105 transition-transform'}
      `}>
        <Image
          src={image}
          width={100}
          height={100}
          alt={title}
          className="rounded-full"
        />
      </div>
      <span className="bg-black text-white px-4 py-1 rounded-full absolute -bottom-2 z-10">
        {title}
      </span>
    </button>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show dashboard if user type is selected
  if (userType) {
    return (
      <ParentDashboard
        tasks={tasks}
        children={children}
        balance={balance}
        onRefresh={loadData}
        onTaskComplete={handleTaskApproved}
      />
    );
  }

  // Main selection screen
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4">
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

        {/* Character Selection */}
        <div className="flex flex-col items-center gap-6 w-full mt-4">
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