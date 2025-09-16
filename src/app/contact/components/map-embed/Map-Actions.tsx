'use client';

import { ExternalLink, Navigation, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MapActionsProps = {
  placeUrl: string;
  directionsUrl: string;
  copied: boolean;
  onCopy: () => void;
};

export const MapActions = ({ placeUrl, directionsUrl, copied, onCopy }: MapActionsProps) => (
  <div className="w-full sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
    <Button asChild variant="outline" size="sm" className="rounded-xl w-full sm:w-auto">
      <a href={placeUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="size-4 ml-1" />
        باز کردن در نقشه
      </a>
    </Button>

    <Button
      asChild
      size="sm"
      className="rounded-xl w-full sm:w-auto bg-[#E9B159] hover:bg-[#E9B159]/90 text-white"
      aria-label="مسیریابی با Google Maps"
    >
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
        <Navigation className="size-4 ml-1" />
        مسیریابی
      </a>
    </Button>

    <Button
      type="button"
      variant="outline"
      size="sm"
      className="rounded-xl w-full col-span-2 sm:col-span-1 sm:w-auto"
      onClick={onCopy}
      aria-label="کپی لینک لوکیشن"
    >
      {copied ? <Check className="size-4 ml-1" /> : <Copy className="size-4 ml-1" />}
      {copied ? 'کپی شد' : 'کپی لینک'}
    </Button>
  </div>
);
