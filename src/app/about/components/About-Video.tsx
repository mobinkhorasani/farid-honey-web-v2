'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, scaleIn } from '@/components/motion/variants';

interface AboutVideoProps {
  url: string;
  poster: string;
}

export const AboutVideo = ({ url, poster }: AboutVideoProps) => {
  const [playing, setPlaying] = useState(false);

  const isYouTubeOrVimeoOrAparat = (url: string) => url.includes('aparat.com');
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`;
    }
    if (url.includes('aparat.com/v/')) {
      const id = url.split('aparat.com/v/')[1]?.split('/')[0];
      return `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`;
    }
    return url;
  };
  return (
    <section className="relative py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
        >
          {!playing ? (
            <div className="relative h-full w-full group">
              {poster && (
                <Image
                  src={poster}
                  alt="پوستر ویدئو"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-28 h-28 border border-[#E9B159]/40 animate-ping" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-20 h-20 border border-[#E9B159]/60 animate-ping [animation-delay:200ms]" />

              <button
                onClick={() => setPlaying(true)}
                aria-label="پخش ویدئو"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E9B159] text-white shadow-xl ring-0 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E9B159]/40"
              >
                <Play className="mx-auto w-9 h-9" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2 opacity-90">
                  🍯 ویدئوی معرفی زنبورستان فرید
                </h3>
                <p className="text-sm md:text-base opacity-70">داستان ما از نزدیک ببینید</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={scaleIn}
              className="relative w-full h-full"
            >
              {isYouTubeOrVimeoOrAparat(url) ? (
                <iframe
                  src={getEmbedUrl(url)}
                  title="ویدئوی معرفی"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  loading="lazy"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={poster}
                  className="w-full h-full object-cover"
                  aria-label="ویدئوی معرفی"
                >
                  <source src={url} type="video/mp4" />
                  مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                </video>
              )}

              <button
                onClick={() => setPlaying(false)}
                aria-label="توقف ویدئو"
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
