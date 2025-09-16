'use client';

import { MapPin } from 'lucide-react';

type MapCanvasProps = {
  placeName: string;
  lat: number;
  lng: number;
  embedUrl: string;
  placeUrl: string;
  interactive: boolean;
  setInteractive: (v: boolean) => void;
};

export const MapCanvas = ({
  placeName,
  lat,
  lng,
  embedUrl,
  placeUrl,
  interactive,
  setInteractive,
}: MapCanvasProps) => (
  <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100 overflow-hidden">
    {/* چیپ لوکیشن */}
    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20">
      <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/90 backdrop-blur border border-gray-200 px-2.5 py-1 text-[11px] sm:text-sm text-gray-700 shadow-sm">
        <MapPin className="size-3.5 sm:size-4" />
        <span className="truncate max-w-[58vw] sm:max-w-none">
          {placeName}
          <span className="hidden sm:inline"> • {lat.toFixed(5)},{lng.toFixed(5)}</span>
        </span>
      </span>
    </div>

    {/* اوورلی تعامل */}
    {!interactive && (
      <button
        onClick={() => setInteractive(true)}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-[2px] text-gray-700"
        aria-label="برای تعامل با نقشه کلیک کنید"
        title="برای تعامل با نقشه کلیک کنید"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/80 border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#E9B159] rounded-full" />
        </div>
        <div className="text-xs sm:text-sm">برای مشاهده و زوم، روی نقشه کلیک کنید</div>
      </button>
    )}

    {/* Iframe */}
    <iframe
      title={`نقشه ${placeName}`}
      src={embedUrl}
      className={`absolute inset-0 w-full h-full border-0 ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />

    {/* Fallback */}
    <noscript>
      <div className="absolute inset-0 flex items-center justify-center">
        <a href={placeUrl} target="_blank" rel="noopener noreferrer" className="text-[#E9B159] underline">
          مشاهده نقشه در Google Maps
        </a>
      </div>
    </noscript>
  </div>
);
