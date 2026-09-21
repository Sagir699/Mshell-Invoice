import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { House, ArrowRight, Info } from 'lucide-react';

interface Props {
  customerName: string;
  onSubmit: (name: string) => void;
}

export function CustomerInfoStep({ customerName, onSubmit }: Props) {
  const [name, setName] = useState(customerName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="max-w-md mx-auto pt-4 sm:pt-8">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-5">
          <House className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Create an Invoice
        </h2>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          Enter the customer or project name below and tap <strong>Continue</strong>.
          <br />
          You can add home project details later — nothing else is required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="customerName" className="text-base font-medium">
            Customer Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="customerName"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='e.g. "John Doe"'
            className="mt-2 h-14 text-lg px-4"
            autoFocus
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold gap-2"
          disabled={!name.trim()}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <div className="flex gap-3 items-start">
          <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-medium text-foreground mb-1">How it works:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Enter the customer or project name → tap Continue</li>
              <li>Pick a template style you like</li>
              <li>See your invoice preview instantly</li>
              <li>Tap <strong>"Edit Details"</strong> to add home project info, materials, labor, and scope.</li>
              <li>Download as PDF or image when ready!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
