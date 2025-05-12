import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemActions } from './item-actions';
import { formatDate } from '@/lib/utils';

export interface Item {
  id: number;
  title: string;
  description: string | null; // Keep it as potentially null here
  createdAt: Date;
  updatedAt: Date;
}

interface ItemListProps {
  items: Item[];
}

export function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No items found. Create your first item!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <Card key={item.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-xs mt-1">
                 Created: {formatDate(item.createdAt)}
                </CardDescription>
              </div>
              <ItemActions item={item} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{item.description || 'No description'}</p>
            {/* Using the OR operator to provide a default string if description is null */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}