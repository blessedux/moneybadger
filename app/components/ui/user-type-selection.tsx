'use client';

import { CircleUser, Baby, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image'

interface UserTypeSelectionProps {
  onSelect: (type: 'mother' | 'father' | 'child') => void;
}

export function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
  const [selected, setSelected] = useState<'mother' | 'father' | 'child' | null>(null);

  const handleSelect = (type: 'mother' | 'father' | 'child') => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Card
        className={cn(
          "p-6 flex flex-col items-center cursor-pointer hover:bg-secondary transition-colors",
          selected === 'mother' && "bg-primary text-primary-foreground"
        )}
        onClick={() => handleSelect('mother')}
      >
        
        <Image
        src="/bicho2.jpg"
        height={1000}
        width={1000}
        alt="Dummy Image"
        className="rounded-full aspect-square object-cover"
      />
        <span className="font-medium">Mother</span>
      </Card>
      
      <Card
        className={cn(
          "p-6 flex flex-col items-center cursor-pointer hover:bg-secondary transition-colors",
          selected === 'father' && "bg-primary text-primary-foreground"
        )}
        onClick={() => handleSelect('father')}
      >
                <Image
        src="/bicho1.jpg"
        height={1000}
        width={1000}
        alt="Dummy Image"
        className="rounded-full aspect-square object-cover"
      />
        <span className="font-medium">Father</span>
      </Card>

      <Card
        className={cn(
          "p-6 flex flex-col items-center cursor-pointer hover:bg-secondary transition-colors",
          selected === 'child' && "bg-primary text-primary-foreground"
        )}
        onClick={() => handleSelect('child')}
      >
                <Image
        src="/bicho3.jpg"
        height={1000}
        width={1000}
        alt="Dummy Image"
        className="rounded-full aspect-square object-cover"
      />
        <span className="font-medium">Child</span>
      </Card>
    </div>
  );
}