import { forwardRef } from 'react';
import { InvoiceData, TemplateName } from '@/types/invoice';
import { SITE_CONFIG } from '@/config/constants';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.jpg';

interface TemplateStyles {
  wrapper: string;
  header: string;
  headerText: string;
  headerAccent: string;
  sectionTitle: string;
  tableHeader: string;
  totalRow: string;
  divider: string;
}

const templateStyles: Record<TemplateName, TemplateStyles> = {
  light: {
    wrapper: 'bg-white text-gray-800',
    header: 'bg-gray-50 border-b border-gray-200',
    headerText: 'text-gray-800',
    headerAccent: 'text-gray-500',
    sectionTitle:
      'text-gray-700 border-b border-gray-200 pb-1 font-semibold text-sm uppercase tracking-wide',
    tableHeader: 'bg-gray-50 text-gray-600 text-xs uppercase',
    totalRow: 'bg-gray-100 font-bold text-lg',
    divider: 'border-gray-200',
  },
  minimal: {
    wrapper: 'bg-white text-gray-900',
    header: 'border-b border-gray-100',
    headerText: 'text-gray-900',
    headerAccent: 'text-gray-400',
    sectionTitle:
      'text-gray-500 border-b border-gray-100 pb-1 font-medium text-xs uppercase tracking-widest',
    tableHeader: 'text-gray-400 text-xs uppercase border-b border-gray-100',
    totalRow: 'font-bold text-lg',
    divider: 'border-gray-100',
  },
  modern: {
    wrapper: 'bg-white text-gray-900',
    header: 'bg-gray-900 text-white',
    headerText: 'text-white',
    headerAccent: 'text-gray-300',
    sectionTitle:
      'text-gray-900 border-b-2 border-gray-900 pb-1 font-bold text-sm uppercase',
    tableHeader: 'bg-gray-900 text-white text-xs uppercase',
    totalRow: 'bg-gray-900 text-white font-bold text-lg',
    divider: 'border-gray-300',
  },
  'red-accent': {
    wrapper: 'bg-white text-gray-900',
    header: 'bg-red-800 text-white',
    headerText: 'text-white',
    headerAccent: 'text-red-200',
    sectionTitle:
      'text-red-800 border-b-2 border-red-800 pb-1 font-bold text-sm uppercase',
    tableHeader: 'bg-red-800 text-white text-xs uppercase',
    totalRow: 'bg-red-800 text-white font-bold text-lg',
    divider: 'border-red-200',
  },
  'clean-card': {
    wrapper: 'bg-gray-50 text-gray-800',
    header: 'bg-white shadow-sm rounded-lg',
    headerText: 'text-gray-800',
    headerAccent: 'text-gray-500',
    sectionTitle: 'text-gray-700 font-semibold text-sm uppercase',
    tableHeader: 'bg-white text-gray-500 text-xs uppercase',
    totalRow: 'bg-white shadow-sm rounded-lg font-bold text-lg',
    divider: 'border-gray-200',
  },
  dealership: {
    wrapper: 'bg-white text-gray-900',
    header: 'border-2 border-gray-800',
    headerText: 'text-gray-900',
    headerAccent: 'text-gray-600',
    sectionTitle:
      'bg-gray-100 text-gray-800 px-2 py-1 font-bold text-xs uppercase tracking-wide',
    tableHeader: 'bg-gray-100 text-gray-700 text-xs uppercase',
    totalRow: 'bg-gray-800 text-white font-bold text-lg',
    divider: 'border-gray-400',
  },
};

interface Props {
  data: InvoiceData;
  template: TemplateName;
}

const fmt = (n: number) => n.toFixed(2);

export const InvoiceDocument = forwardRef<HTMLDivElement, Props>(
  ({ data, template }, ref) => {
    const t = templateStyles[template];

    const hasVehicle =
      data.vehicleYear || data.vehicleMake || data.vehicleModel || data.vehicleMileage;
    const vehicleStr = [data.vehicleYear, data.vehicleMake, data.vehicleModel]
      .filter(Boolean)
      .join(' ');

    const partsTotal = data.parts.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const laborTotal = data.labor.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const subtotal = partsTotal + laborTotal;
    const discountAmt = data.discount || 0;
    const taxable = Math.max(subtotal - discountAmt, 0);
    const taxAmt = data.taxEnabled ? taxable * (data.taxRate / 100) : 0;
    const total = taxable + taxAmt;

    const renderTable = (
      items: typeof data.parts,
      qtyLabel: string
    ) => (
      <table className="w-full">
        <thead>
          <tr className={t.tableHeader}>
            <th className="text-left py-1.5 px-2">Description</th>
            <th className="text-center py-1.5 px-2 w-16">{qtyLabel}</th>
            <th className="text-right py-1.5 px-2 w-24">Price</th>
            <th className="text-right py-1.5 px-2 w-24">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className={cn('border-b', t.divider)}>
              <td className="py-1.5 px-2">{item.description}</td>
              <td className="text-center py-1.5 px-2">{item.quantity}</td>
              <td className="text-right py-1.5 px-2">₦{fmt(item.unitPrice)}</td>
              <td className="text-right py-1.5 px-2">
                ₦{fmt(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div ref={ref} className={cn('w-[680px] min-h-[880px] p-8 text-sm', t.wrapper)}>
        {/* Header */}
        <div className={cn('p-5 mb-6 flex items-center gap-4', t.header)}>
          <img
            src={logo}
            alt="Wagner's Mobile Mechanic"
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h1 className={cn('text-xl font-bold', t.headerText)}>
              {SITE_CONFIG.siteName}
            </h1>
            <p className={cn('text-sm', t.headerAccent)}>{SITE_CONFIG.phone}</p>
            <p className={cn('text-xs', t.headerAccent)}>{SITE_CONFIG.serviceArea}</p>
          </div>
          <div className="text-right">
            <p className={cn('text-lg font-bold', t.headerText)}>
              {data.invoiceNumber}
            </p>
            <p className={cn('text-xs', t.headerAccent)}>{data.invoiceDate}</p>
          </div>
        </div>

        {/* Billed To */}
        {data.customerName && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Billed To</h2>
            <p className="font-medium">{data.customerName}</p>
            {data.customerPhone && (
              <p className="text-xs opacity-70">{data.customerPhone}</p>
            )}
            {data.customerAddress && (
              <p className="text-xs opacity-70">{data.customerAddress}</p>
            )}
          </div>
        )}

        {/* Vehicle */}
        {hasVehicle && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Vehicle Information</h2>
            {vehicleStr && <p>{vehicleStr}</p>}
            {data.vehicleMileage && (
              <p className="text-xs opacity-70">Mileage: {data.vehicleMileage}</p>
            )}
          </div>
        )}

        {/* Complaint */}
        {data.complaint && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Customer Complaint</h2>
            <p>{data.complaint}</p>
          </div>
        )}

        {/* Service */}
        {data.servicePerformed && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Service Performed</h2>
            <p>{data.servicePerformed}</p>
          </div>
        )}

        {/* Parts */}
        {data.parts.length > 0 && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Parts &amp; Materials</h2>
            {renderTable(data.parts, 'Qty')}
          </div>
        )}

        {/* Labor */}
        {data.labor.length > 0 && (
          <div className="mb-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Labor &amp; Fees</h2>
            {renderTable(data.labor, 'Hrs')}
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 pt-4">
          <div className={cn('border-t pt-3 space-y-1', t.divider)}>
            <div className="flex justify-between px-2">
              <span>Subtotal</span>
              <span>₦{fmt(subtotal)}</span>
            </div>
            {discountAmt > 0 && (
              <div className="flex justify-between px-2 text-green-700">
                <span>Discount</span>
                <span>-₦{fmt(discountAmt)}</span>
              </div>
            )}
            {data.taxEnabled && (
              <div className="flex justify-between px-2">
                <span>Tax ({data.taxRate}%)</span>
                <span>₦{fmt(taxAmt)}</span>
              </div>
            )}
            <div className={cn('flex justify-between px-3 py-2.5 rounded mt-2', t.totalRow)}>
              <span>TOTAL DUE</span>
              <span>₦{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        {(data.paymentMethod || data.paymentStatus) && (
          <div className="mt-5">
            <h2 className={cn('mb-2', t.sectionTitle)}>Payment Information</h2>
            {data.paymentMethod && <p>Method: {data.paymentMethod}</p>}
            {data.paymentStatus && <p>Status: {data.paymentStatus}</p>}
          </div>
        )}
      </div>
    );
  }
);

InvoiceDocument.displayName = 'InvoiceDocument';
