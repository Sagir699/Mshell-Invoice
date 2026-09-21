import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SavedInvoice } from '@/types/invoice';
import { Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: SavedInvoice[];
  onLoad: (invoice: SavedInvoice) => void;
  onDelete: (id: string) => void;
}

export function InvoiceHistory({
  open,
  onOpenChange,
  history,
  onLoad,
  onDelete,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Invoice History</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {history.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No saved invoices yet
            </p>
          )}
          {history.map(inv => {
            const partsTotal = inv.data.parts.reduce(
              (s, i) => s + i.quantity * i.unitPrice,
              0
            );
            const laborTotal = inv.data.labor.reduce(
              (s, i) => s + i.quantity * i.unitPrice,
              0
            );
            const subtotal = partsTotal + laborTotal;
            const disc = inv.data.discount || 0;
            const taxable = Math.max(subtotal - disc, 0);
            const tax = inv.data.taxEnabled
              ? taxable * (inv.data.taxRate / 100)
              : 0;
            const total = taxable + tax;

            return (
              <div
                key={inv.id}
                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => {
                  onLoad(inv);
                  onOpenChange(false);
                }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {inv.data.invoiceNumber}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {inv.data.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ₦{total.toFixed(2)} ·{' '}
                    {new Date(inv.savedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(inv.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
