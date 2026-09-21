export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleMileage: string;
  complaint: string;
  servicePerformed: string;
  parts: LineItem[];
  labor: LineItem[];
  discount: number;
  taxEnabled: boolean;
  taxRate: number;
  paymentMethod: string;
  paymentStatus: string;
}

export type TemplateName = 'light' | 'minimal' | 'modern' | 'red-accent' | 'clean-card' | 'dealership';

export interface InvoiceState {
  step: number;
  data: InvoiceData;
  template: TemplateName;
}

export interface SavedInvoice {
  id: string;
  data: InvoiceData;
  template: TemplateName;
  savedAt: string;
}

export function createDefaultInvoiceData(): InvoiceData {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return {
    invoiceNumber: `INV-${year}-${num}`,
    invoiceDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleMileage: '',
    complaint: '',
    servicePerformed: '',
    parts: [],
    labor: [],
    discount: 0,
    taxEnabled: false,
    taxRate: 7,
    paymentMethod: '',
    paymentStatus: '',
  };
}

export function createDefaultState(): InvoiceState {
  return {
    step: 1,
    data: createDefaultInvoiceData(),
    template: 'red-accent',
  };
}
