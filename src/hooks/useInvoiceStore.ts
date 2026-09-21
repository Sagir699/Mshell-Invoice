import { useState, useEffect } from 'react';
import { InvoiceState, InvoiceData, SavedInvoice, createDefaultState, TemplateName } from '@/types/invoice';

const DRAFT_KEY = 'mshell-homes-invoice-draft';
const HISTORY_KEY = 'mshell-homes-invoice-history';

export function useInvoiceStore() {
  const [state, setRawState] = useState<InvoiceState>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return createDefaultState();
  });

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
  }, [state]);

  const updateData = (updates: Partial<InvoiceData>) => {
    setRawState(prev => ({ ...prev, data: { ...prev.data, ...updates } }));
  };

  const setStep = (step: number) => setRawState(prev => ({ ...prev, step }));

  const setTemplate = (template: TemplateName) =>
    setRawState(prev => ({ ...prev, template }));

  const reset = () => setRawState(createDefaultState());

  return { state, updateData, setStep, setTemplate, reset, setState: setRawState };
}

export function useInvoiceHistory() {
  const [history, setHistory] = useState<SavedInvoice[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const saveInvoice = (data: InvoiceData, template: TemplateName) => {
    const invoice: SavedInvoice = {
      id: crypto.randomUUID(),
      data,
      template,
      savedAt: new Date().toISOString(),
    };
    setHistory(prev => [invoice, ...prev]);
    return invoice;
  };

  const deleteInvoice = (id: string) => {
    setHistory(prev => prev.filter(i => i.id !== id));
  };

  return { history, saveInvoice, deleteInvoice };
}
