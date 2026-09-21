import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { InvoiceData } from '@/types/invoice';
import { LineItemsEditor } from './LineItemsEditor';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: InvoiceData;
  onUpdate: (updates: Partial<InvoiceData>) => void;
}

export function EditDetailsDrawer({ open, onOpenChange, data, onUpdate }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit Invoice Details</SheetTitle>
          <SheetDescription>
            Fill in only what you need — empty fields won't show on the invoice.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          {/* Customer */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              👤 Customer Info
            </h3>
            <div>
              <Label>Name</Label>
              <Input
                value={data.customerName}
                onChange={e => onUpdate({ customerName: e.target.value })}
                className="h-11"
              />
            </div>
            <div>
              <Label>Phone <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                value={data.customerPhone}
                onChange={e => onUpdate({ customerPhone: e.target.value })}
                placeholder="e.g. 08012739487"
                className="h-11"
              />
            </div>
            <div>
              <Label>Address <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
              <Input
                value={data.customerAddress}
                onChange={e => onUpdate({ customerAddress: e.target.value })}
                placeholder="e.g. Abuja"
                className="h-11"
              />
            </div>
          </section>

          <Separator />

          {/* Property / Project */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              🏠 Property Info <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Year Built</Label>
                <Input
                  value={data.vehicleYear}
                  onChange={e => onUpdate({ vehicleYear: e.target.value })}
                  placeholder="e.g. 2018"
                  className="h-11"
                />
              </div>
              <div>
                <Label>Project Type</Label>
                <Input
                  value={data.vehicleMake}
                  onChange={e => onUpdate({ vehicleMake: e.target.value })}
                  placeholder="e.g. Bathroom Remodel"
                  className="h-11"
                />
              </div>
              <div>
                <Label>Location / Area</Label>
                <Input
                  value={data.vehicleModel}
                  onChange={e => onUpdate({ vehicleModel: e.target.value })}
                  placeholder="e.g. Main Floor"
                  className="h-11"
                />
              </div>
              <div>
                <Label>Square Footage</Label>
                <Input
                  value={data.vehicleMileage}
                  onChange={e => onUpdate({ vehicleMileage: e.target.value })}
                  placeholder="e.g. 1,250 sq ft"
                  className="h-11"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Project Details */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              🔧 Project Details <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <div>
              <Label>Customer Request</Label>
              <Textarea
                value={data.complaint}
                onChange={e => onUpdate({ complaint: e.target.value })}
                placeholder='e.g. "Need kitchen cabinets replaced and painted"'
                rows={2}
              />
            </div>
            <div>
              <Label>Scope of Work</Label>
              <Textarea
                value={data.servicePerformed}
                onChange={e => onUpdate({ servicePerformed: e.target.value })}
                placeholder='e.g. "Removed old cabinets, installed new units, final cleanup"'
                rows={2}
              />
            </div>
          </section>

          <Separator />

          {/* Materials */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              🔩 Materials &amp; Supplies <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Tap "Add Row" to list materials. Each row: description, quantity, price.
            </p>
            <LineItemsEditor
              items={data.parts}
              onChange={parts => onUpdate({ parts })}
            />
          </section>

          <Separator />

          {/* Labor */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              ⏱️ Labor &amp; Services <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Tap "Add Row" to list labor or service tasks. Each row: description, hours, hourly rate.
            </p>
            <LineItemsEditor
              items={data.labor}
              onChange={labor => onUpdate({ labor })}
            />
          </section>

          <Separator />

          {/* Financials */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              💰 Financials <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <div>
              <Label>Discount (₦) <span className="text-xs text-muted-foreground font-normal">— leave empty for no discount</span></Label>
              <Input
                type="number"
                min={0}
                value={data.discount || ''}
                onChange={e =>
                  onUpdate({ discount: parseFloat(e.target.value) || 0 })
                }
                placeholder="0.00"
                className="h-11"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <Label>Enable Tax</Label>
                <p className="text-xs text-muted-foreground">Add sales tax to the total</p>
              </div>
              <Switch
                checked={data.taxEnabled}
                onCheckedChange={v => onUpdate({ taxEnabled: v })}
              />
            </div>
            {data.taxEnabled && (
              <div>
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={data.taxRate}
                  onChange={e =>
                    onUpdate({ taxRate: parseFloat(e.target.value) || 0 })
                  }
                  className="h-11"
                />
              </div>
            )}
          </section>

          <Separator />

          {/* Payment */}
          <section className="space-y-3">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground flex items-center gap-2">
              💳 Payment <span className="text-xs font-normal normal-case">(optional)</span>
            </h3>
            <div>
              <Label>Payment Method</Label>
              <Input
                value={data.paymentMethod}
                onChange={e => onUpdate({ paymentMethod: e.target.value })}
                placeholder="e.g. Cash, Card"
                className="h-11"
              />
            </div>
            <div>
              <Label>Payment Status</Label>
              <Input
                value={data.paymentStatus}
                onChange={e => onUpdate({ paymentStatus: e.target.value })}
                placeholder="e.g. Paid, Pending"
                className="h-11"
              />
            </div>
          </section>

          <div className="h-6" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
