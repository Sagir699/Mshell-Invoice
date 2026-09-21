import { useRef, useState } from 'react';
import { InvoiceData, TemplateName } from '@/types/invoice';
import { InvoiceDocument } from './InvoiceDocument';
import { EditDetailsDrawer } from './EditDetailsDrawer';
import { exportToPng, exportToPdf } from '@/utils/exportInvoice';
import { Button } from '@/components/ui/button';
import {
  FileDown,
  Image,
  Pencil,
  Save,
  Plus,
  Info,
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  data: InvoiceData;
  template: TemplateName;
  onUpdateData: (updates: Partial<InvoiceData>) => void;
  onSave: () => void;
  onNew: () => void;
}

export function InvoicePreview({
  data,
  template,
  onUpdateData,
  onSave,
  onNew,
}: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState<'pdf' | 'png' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleExportPng = async () => {
    if (!invoiceRef.current) return;
    setExporting('png');
    try {
      await exportToPng(invoiceRef.current, data.invoiceNumber);
      toast.success('PNG downloaded!');
    } catch {
      toast.error('Export failed');
    }
    setExporting(null);
  };

  const handleExportPdf = async () => {
    if (!invoiceRef.current) return;
    setExporting('pdf');
    try {
      await exportToPdf(invoiceRef.current, data.invoiceNumber);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('Export failed');
    }
    setExporting(null);
  };

  const hasAnyDetails =
    data.parts.length > 0 ||
    data.labor.length > 0 ||
    data.customerPhone ||
    data.vehicleMake;

  return (
    <div>
      {/* Beginner hint */}
      {!hasAnyDetails && (
        <div className="max-w-lg mx-auto mb-6 p-4 rounded-xl bg-accent/50 border border-primary/20">
          <div className="flex gap-3 items-start">
            <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm leading-relaxed">
              <p className="font-medium text-foreground mb-1">
                👋 Your invoice is ready!
              </p>
              <p className="text-muted-foreground">
                Want to add project details, materials, or labor charges? Tap{' '}
                <strong>"✏️ Edit Details"</strong> below. Otherwise, you can
                download it right away!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons - reorganized for beginners */}
      <div className="max-w-lg mx-auto mb-6 space-y-3">
        {/* Primary actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-14 text-base gap-2"
            onClick={() => setDrawerOpen(true)}
          >
            <Pencil className="w-5 h-5" /> Edit Details
          </Button>
          <Button
            className="h-14 text-base gap-2"
            onClick={onSave}
          >
            <Save className="w-5 h-5" /> Save
          </Button>
        </div>

        {/* Download actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={handleExportPdf}
            disabled={!!exporting}
          >
            <FileDown className="w-4 h-4" />
            {exporting === 'pdf' ? 'Saving...' : 'Download PDF'}
          </Button>
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={handleExportPng}
            disabled={!!exporting}
          >
            <Image className="w-4 h-4" />
            {exporting === 'png' ? 'Saving...' : 'Download Image'}
          </Button>
        </div>

        {/* New invoice */}
        <Button
          variant="ghost"
          className="w-full h-10 text-muted-foreground"
          onClick={onNew}
        >
          <Plus className="w-4 h-4 mr-1" /> Start a New Invoice
        </Button>
      </div>

      <div className="flex justify-center overflow-x-auto pb-8">
        <div className="shadow-2xl rounded-lg overflow-hidden">
          <InvoiceDocument ref={invoiceRef} data={data} template={template} />
        </div>
      </div>

      <EditDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        data={data}
        onUpdate={onUpdateData}
      />
    </div>
  );
}
