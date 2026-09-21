import { LineItem } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
}

export function LineItemsEditor({ items, onChange }: Props) {
  const addItem = () => {
    onChange([
      ...items,
      { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, updates: Partial<LineItem>) => {
    onChange(items.map(i => (i.id === id ? { ...i, ...updates } : i)));
  };

  return (
    <div className="space-y-2">
      {items.length > 0 && (
        <div className="flex gap-2 text-xs text-muted-foreground px-1">
          <span className="flex-1">Description</span>
          <span className="w-16 text-center">Qty</span>
          <span className="w-24 text-right">Price (₦)</span>
          <span className="w-9" />
        </div>
      )}
      {items.map(item => (
        <div key={item.id} className="flex gap-2 items-start">
          <Input
            value={item.description}
            onChange={e => updateItem(item.id, { description: e.target.value })}
            placeholder="What was it?"
            className="flex-1 h-11"
          />
          <Input
            type="number"
            value={item.quantity}
            onChange={e =>
              updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
            }
            className="w-16 h-11 text-center"
            min={0}
          />
          <Input
            type="number"
            value={item.unitPrice || ''}
            onChange={e =>
              updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
            }
            placeholder="0.00"
            className="w-24 h-11"
            min={0}
            step={0.01}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="shrink-0 h-11 w-9 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-11">
        <Plus className="w-4 h-4 mr-1" /> Add Row
      </Button>
    </div>
  );
}
