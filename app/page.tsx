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
  const [loading, setLoading] = useState(true);

  // In a real app, this would come from authentication
  const mockUserId = userType === 'child' ? 'child1' : 'parent1';

  const loadData = async () => {
    if (!userType) return;

    try {
      setLoading(true);
      const tasksData = await fetchTasks(mockUserId);
      setTasks(tasksData);

      if (userType === 'mother' || userType === 'father') {
        const childrenData = await fetchChildren(mockUserId);
        setChildren(childrenData);
        // In a real app, this would come from the parent's wallet
        setBalance(10000);
      } else {
        // For child, we'll use their personal balance
        const childData = await fetchChildren(mockUserId);
        if (childData.length > 0) {
          setBalance(childData[0].balance);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // In a production app, we'd show a proper error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userType, mockUserId]);

  const handleTaskComplete = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, 'COMPLETED');
      // Refresh tasks after updating

      await loadData();
    } catch (error) {
      console.error('Error completing task:', error);
      // In a production app, we'd show a proper error message to the user
    }
  };

  const handleTaskApproved = async (taskId: string) => {
    try {
      await updateTaskStatus(taskId, 'APPROVED');
      // Refresh tasks after updating

      await loadData();
    } catch (error) {
      console.error('Error completing task:', error);
      // In a production app, we'd show a proper error message to the user
    }
  };

  const handleWalletConnect = () => {
    console.log('Wallet connected');
    setIsWalletConnected(true);
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center p-4"
      style={{
        backgroundImage: 'url(/background2.svg)',
        backgroundSize: '20px 20px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Image
            src="/logotransparente.png"
            width={300}
            height={100}
            alt="Money Badger"
            priority
          />
          <p className="text-lg text-brown-800 mt-2">
            Bitcoin to kids
          </p>
        </div>

        {/* Wallet Connection Status */}
        {isWalletConnected ? (
          <div className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Connected
          </div>
        ) : (
          <BitcoinConnectClientWrapper onConnect={handleWalletConnect} />
        )}

        {/* Character Selection */}
        <div className="flex flex-col items-center gap-6 w-full">
          <button 
            onClick={() => setUserType('father')} 
            className={`w-48 flex flex-col items-center relative ${!isWalletConnected && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isWalletConnected}
          >
            <div className="bg-blue-600 rounded-full p-4 w-32 h-32 flex items-center justify-center">
              <Image
                src="/bicho1.jpg"
                width={100}
                height={100}
                alt="Daddy Badger"
                className="rounded-full"
              />
            </div>
            <span className="bg-black text-white px-4 py-1 rounded-full absolute -bottom-2">
              Daddy Badger
            </span>
          </button>

          <button 
            onClick={() => setUserType('mother')} 
            className={`w-48 flex flex-col items-center relative ${!isWalletConnected && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isWalletConnected}
          >
            <div className="bg-pink-500 rounded-full p-4 w-32 h-32 flex items-center justify-center">
              <Image
                src="/bicho2.jpg"
                width={100}
                height={100}
                alt="Mommy Badger"
                className="rounded-full"
              />
            </div>
            <span className="bg-black text-white px-4 py-1 rounded-full absolute -bottom-2">
              Mommy Badger
            </span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      )}

      {userType === 'child' ? (
        <ChildDashboard
          tasks={tasks}
          balance={balance}
          onTaskComplete={handleTaskComplete}
        />
      ) : (
        <ParentDashboard
          tasks={tasks}
          children={children}
          balance={balance}
          onRefresh={loadData}
          onTaskComplete={handleTaskApproved}
        />
      )}
    </div>
  );
}