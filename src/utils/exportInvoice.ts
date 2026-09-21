import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportToPng(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    quality: 1,
    cacheBust: true,
  });
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function exportToPdf(element: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(element, {
    pixelRatio: 3,
    quality: 1,
    cacheBust: true,
  });

  const img = new window.Image();
  img.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
  });

  const pdf = new jsPDF('p', 'in', 'letter');
  const pageWidth = 8.5;
  const pageHeight = 11;
  const margin = 0.4;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;
  const ratio = img.height / img.width;

  let w = maxWidth;
  let h = w * ratio;
  if (h > maxHeight) {
    h = maxHeight;
    w = h / ratio;
  }

  const x = (pageWidth - w) / 2;
  pdf.addImage(dataUrl, 'PNG', x, margin, w, h);
  pdf.save(`${filename}.pdf`);
}
