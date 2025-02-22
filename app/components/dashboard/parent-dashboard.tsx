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

interface ParentDashboardProps {
  tasks: Task[];
  children: Child[];
  balance: number;
  onRefresh?: () => void;
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold">{balance} sats</span>
          <AddTaskForm children={children} onTaskAdded={handleTaskAdded} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Children</h2>
            <div className="flex gap-2">
              <AddChildForm onChildAdded={handleChildAdded} />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {children.map((child) => (
              <Card key={child.id} className="p-4 flex items-center gap-3">
                <Baby className="h-8 w-8" />
                <div>
                  <p className="font-medium">{child.name}</p>
                  <p className="text-sm text-muted-foreground">{child.balance} sats</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                
                <TableHead>Reward</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  
                  <TableCell>{task.reward} sats</TableCell>
                  {task.status === 'COMPLETED' && (
                <Button
                  onClick={() => onTaskComplete(task.id)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                 
                </Button>
              )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}