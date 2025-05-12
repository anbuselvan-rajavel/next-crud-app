// app/components/dashboard.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { ItemForm } from './item-form';
import { ItemList } from './item-list';
import { Item } from './item-list'; // Import the Item type from where it's defined

interface DashboardProps {
  allItems: Item[];
}

export default function Dashboard({ allItems }: DashboardProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Items Dashboard</h1>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Create New Item</DialogTitle>
            <ItemForm closeModal={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>   
      
      <ItemList items={allItems} />
    </main>
  );
}