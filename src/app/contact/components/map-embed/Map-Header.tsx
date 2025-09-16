'use client';

import { MapPin } from 'lucide-react';

type MapHeaderProps = {
  title: string;
  subtitle?: string;
};

export const MapHeader = ({ title, subtitle }: MapHeaderProps) => (
  <div className="flex items-start sm:items-center gap-3 min-w-0">
    <div className="size-9 sm:size-10 rounded-full bg-[#FFF7EA] border border-[#FFE4B8] flex items-center justify-center shrink-0">
      <MapPin className="size-4 sm:size-5" />
    </div>
    <div className="min-w-0">
      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">{title}</h3>
      {subtitle && <p className="text-[11px] sm:text-sm text-[#6B7280] mt-0.5">{subtitle}</p>}
    </div>
  </div>
);
