'use client';

import { useState } from 'react';
import { directionsLink, LAT, LNG, mapEmbedUrl, PLACE_NAME, PLACE_URL } from './map-embed/constants';
import { copyToClipboard } from './map-embed/utils';
import { MapHeader } from './map-embed/Map-Header';
import { MapActions } from './map-embed/Map-Actions';
import { MapCanvas } from './map-embed/Map-Canvas';


export const MapEmbed = () => {
  const [interactive, setInteractive] = useState(false);
  const [copied, setCopied] = useState(false);

  const EMBED_URL = mapEmbedUrl(LAT, LNG);
  const DIRECTIONS_URL = directionsLink(LAT, LNG);

  const handleCopy = async () => {
    const ok = await copyToClipboard(PLACE_URL);
    setCopied(ok);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EFEFEF] shadow-sm overflow-hidden" dir="rtl">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <MapHeader
            title={`نقشه موقعیت ${PLACE_NAME}`}
            subtitle="برای مشاهده و تعامل با نقشه، روی نقشه کلیک کنید"
          />
          <MapActions
            placeUrl={PLACE_URL}
            directionsUrl={DIRECTIONS_URL}
            copied={copied}
            onCopy={handleCopy}
          />
        </div>
      </div>

      <MapCanvas
        placeName={PLACE_NAME}
        lat={LAT}
        lng={LNG}
        embedUrl={EMBED_URL}
        placeUrl={PLACE_URL}
        interactive={interactive}
        setInteractive={setInteractive}
      />
    </div>
  );
};
