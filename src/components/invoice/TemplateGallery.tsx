import { TemplateName } from '@/types/invoice';
import { cn } from '@/lib/utils';
import { Check, ArrowRight } from 'lucide-react';

interface Props {
  onSelect: (template: TemplateName) => void;
  selected: TemplateName;
}

const templates: {
  id: TemplateName;
  name: string;
  desc: string;
  header: string;
  accent: string;
  text: string;
  emoji: string;
}[] = [
  {
    id: 'light',
    name: 'Light',
    desc: 'Clean & bright',
    header: 'bg-gray-100',
    accent: 'bg-gray-300',
    text: 'bg-gray-200',
    emoji: '☀️',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Simple & elegant',
    header: 'bg-gray-50 border border-gray-200',
    accent: 'bg-gray-200',
    text: 'bg-gray-100',
    emoji: '✨',
  },
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Bold & professional',
    header: 'bg-gray-900',
    accent: 'bg-gray-700',
    text: 'bg-gray-200',
    emoji: '🔥',
  },
  {
    id: 'red-accent',
    name: 'Red Accent',
    desc: 'Matches your brand',
    header: 'bg-red-800',
    accent: 'bg-red-500',
    text: 'bg-red-100',
    emoji: '🔴',
  },
  {
    id: 'clean-card',
    name: 'Clean Card',
    desc: 'Soft & modern',
    header: 'bg-white shadow-md border border-gray-100',
    accent: 'bg-gray-200',
    text: 'bg-gray-50',
    emoji: '💳',
  },
  {
    id: 'dealership',
    name: 'Dealership',
    desc: 'Classic shop style',
    header: 'bg-gray-800',
    accent: 'bg-gray-500',
    text: 'bg-gray-100',
    emoji: '🏢',
  },
];

export function TemplateGallery({ onSelect, selected }: Props) {
  return (
    <div className="pt-2 sm:pt-4">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Pick a Style
        </h2>
        <p className="text-muted-foreground mt-2 text-base">
          Tap any template below — you can always change it later
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              'rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg text-left group relative',
              selected === t.id
                ? 'border-primary ring-2 ring-primary/20 shadow-md'
                : 'border-border hover:border-primary/40'
            )}
          >
            {selected === t.id && (
              <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            )}
            <div className="p-3 sm:p-4 space-y-1.5 bg-white">
              <div className={cn('h-5 sm:h-6 rounded', t.header)} />
              <div className="flex gap-1.5">
                <div className={cn('h-1.5 rounded flex-1', t.text)} />
                <div className={cn('h-1.5 rounded w-8', t.accent)} />
              </div>
              <div className={cn('h-1.5 rounded w-3/4', t.text)} />
              <div className={cn('h-1.5 rounded w-1/2', t.text)} />
              <div className={cn('h-3 rounded w-1/3 ml-auto mt-2', t.accent)} />
            </div>
            <div className="p-2.5 sm:p-3 text-center border-t bg-muted/30">
              <p className="font-semibold text-sm text-foreground">
                {t.emoji} {t.name}
              </p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
            {selected === t.id && (
              <div className="p-2 bg-primary/5 text-center border-t">
                <span className="text-xs font-medium text-primary flex items-center justify-center gap-1">
                  Selected — tap to continue <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        💡 Tip: You can change the template anytime by going back to this step
      </p>
    </div>
  );
}
