'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ParentDashboard } from '@/app/components/dashboard/parent-dashboard';

export default function DashboardPage({ params }: { params: { type: string } }) {
  const router = useRouter();
  
  useEffect(() => {
    // Check if we have a valid user type and wallet connection
    const storedType = localStorage.getItem('userType');
    if (!storedType || (storedType !== params.type)) {
      router.push('/');
    }
  }, [params.type, router]);

  return (
    <ParentDashboard
      tasks={[]}
      children={[]}
      balance={10000}
      onRefresh={() => {}}
      onTaskComplete={() => {}}
    />
  );
} 