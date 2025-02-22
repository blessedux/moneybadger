'use client';

import { Task } from '@/app/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface ChildDashboardProps {
  tasks: Task[];
  balance: number;
  onTaskComplete: (taskId: string) => void;
}

export function ChildDashboard({ tasks, balance, onTaskComplete }: ChildDashboardProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <div className="text-xl font-semibold">{balance} sats</div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-muted-foreground">{task.description}</p>
                <p className="text-sm mt-2">Reward: {task.reward} sats</p>
              </div>
              {task.status === 'PENDING' && (
                <Button
                  onClick={() => onTaskComplete(task.id)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark as Done
                </Button>
              )}
              {task.status === 'COMPLETED' && (
                <span className="text-muted-foreground">Waiting for approval</span>
              )}
              {task.status === 'APPROVED' && (
                <span className="text-green-600">Completed!</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}