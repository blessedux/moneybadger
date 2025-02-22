'use client';

import { Plus, Minus, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Task, Child } from '@/app/types';
import { AddChildForm } from '@/app/components/forms/add-child-form';
import { AddTaskForm } from '@/app/components/forms/add-task-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ParentDashboardProps {
  tasks: Task[];
  children: Child[];
  balance: number;
  onRefresh: () => void;
  onTaskComplete: (taskId: string) => void;
}

export function ParentDashboard({ tasks, children, balance, onRefresh, onTaskComplete }: ParentDashboardProps) {
  const handleChildAdded = () => {
    if (onRefresh) onRefresh();
  };

  const handleTaskAdded = () => {
    if (onRefresh) onRefresh();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="bg-yellow-400 rounded-full py-3 px-6 flex items-center gap-3">
        <Image
          src="/bicho1.jpg"
          width={40}
          height={40}
          alt="Parent Profile"
          className="rounded-full"
        />
        <span className="text-xl font-bold">Parent Dashboard</span>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-yellow-100">
        <div className="flex items-center gap-2">
          <Image
            src="/bitcoin-icon.svg"
            width={24}
            height={24}
            alt="Bitcoin"
          />
          <span className="text-2xl font-bold text-brown-800">
            {balance.toLocaleString()} sats
          </span>
        </div>
      </div>

      {/* Children Section */}
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-yellow-100">
        <h2 className="text-xl font-bold text-brown-800 mb-4">Children</h2>
        <div className="space-y-3">
          {children.map((child) => (
            <div key={child.id} className="flex items-center gap-3">
              <Image
                src="/child-avatar.png"
                width={40}
                height={40}
                alt={child.name}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold">{child.name}</div>
                <div className="text-sm text-gray-600">{child.balance} sats</div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-brown-800 text-white px-6 py-2 rounded-full w-full">
          Add Child
        </button>
      </div>

      {/* Tasks Overview */}
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-yellow-100">
        <h2 className="text-xl font-bold text-brown-800 mb-4">Tasks Overview</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold">{task.title}</div>
              <div className="text-sm text-gray-600">{task.reward} sats</div>
              <div className="text-sm text-gray-600">Assigned to: {task.assignedTo}</div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-brown-800 text-white px-6 py-2 rounded-full w-full">
          + Add Task
        </button>
      </div>
    </div>
  );
}