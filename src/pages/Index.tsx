import { useState } from 'react';
import { useInvoiceStore, useInvoiceHistory } from '@/hooks/useInvoiceStore';
import { CustomerInfoStep } from '@/components/invoice/CustomerInfoStep';
import { TemplateGallery } from '@/components/invoice/TemplateGallery';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { InvoiceHistory } from '@/components/invoice/InvoiceHistory';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/config/constants';
import { SavedInvoice } from '@/types/invoice';
import { History, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.jpg';

const stepLabels = ['Customer', 'Template', 'Invoice'];

const Index = () => {
  const { state, updateData, setStep, setTemplate, reset, setState } =
    useInvoiceStore();
  const { history, saveInvoice, deleteInvoice } = useInvoiceHistory();
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleCustomerSubmit = (name: string) => {
    updateData({ customerName: name });
    setStep(2);
  };

  const handleTemplateSelect = (template: typeof state.template) => {
    setTemplate(template);
    setStep(3);
  };

  const handleSave = () => {
    saveInvoice(state.data, state.template);
    toast.success('Invoice saved to history!');
  };

  const handleNew = () => {
    reset();
  };

  const handleLoadInvoice = (inv: SavedInvoice) => {
    setState({ step: 3, data: inv.data, template: inv.template });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="font-bold text-foreground text-sm leading-tight">
                {SITE_CONFIG.siteName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {SITE_CONFIG.serviceArea}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHistoryOpen(true)}
                className="gap-1.5"
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
                <span className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Nav + Step indicator */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          {state.step > 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(state.step - 1)}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}
        </div>

        {/* Step progress bar */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-1 sm:gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    s < state.step
                      ? 'bg-primary text-primary-foreground'
                      : s === state.step
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < state.step ? '✓' : s}
                </div>
                <span
                  className={`text-xs font-medium ${
                    s <= state.step
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {stepLabels[s - 1]}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mb-5 ${
                    s < state.step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 pb-12">
        {state.step === 1 && (
          <CustomerInfoStep
            customerName={state.data.customerName}
            onSubmit={handleCustomerSubmit}
          />
        )}
        {state.step === 2 && (
          <TemplateGallery
            onSelect={handleTemplateSelect}
            selected={state.template}
          />
        )}
        {state.step === 3 && (
          <InvoicePreview
            data={state.data}
            template={state.template}
            onUpdateData={updateData}
            onSave={handleSave}
            onNew={handleNew}
          />
        )}
      </main>

      <InvoiceHistory
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        history={history}
        onLoad={handleLoadInvoice}
        onDelete={deleteInvoice}
      />
    </div>
  );
};

export default Index;
