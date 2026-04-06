'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@/components/icons';
import { AddToCart } from '@/components/AddToCart';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Service {
  id: number;
  title: string;
  price: string;
  duration: string;
  rating: string;
  reviews: string;
  image: string;
  images?: string[];
  description: string;
  benefits?: string[];
}

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  // Reset image when service changes
  useEffect(() => {
    setActiveImg(0);
  }, [service?.id]);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!service?.images) return;
    setActiveImg((i) => (i - 1 + service.images!.length) % service.images!.length);
  }, [service]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!service?.images) return;
    setActiveImg((i) => (i + 1) % service.images!.length);
  }, [service]);

  if (!service) return null;

  const images = service.images?.length ? service.images : [service.image];

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 overflow-hidden sm:rounded-[3rem] border-none bg-white max-h-[95dvh] flex flex-col gap-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{service.title}</DialogTitle>
        </DialogHeader>

        {/* Image Carousel */}
        <div className="relative w-full aspect-[16/9] shrink-0 bg-gray-100 overflow-hidden">
          <Image
            src={images[activeImg]}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-all duration-500"
            priority
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Navigation arrows — only if multiple images */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === activeImg ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-3 px-6 pt-4 overflow-x-auto scrollbar-hide shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={`Thumbnail ${i + 1}`}
                className={cn(
                  "relative shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all",
                  i === activeImg ? "border-primary scale-105 shadow-md shadow-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${service.title} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6">

          {/* Title + Rating */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 leading-tight">
              {service.title}
            </h2>
            <div className="shrink-0 flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
              ★ {service.rating}
              <span className="text-green-500 font-medium ml-1">({service.reviews})</span>
            </div>
          </div>

          {/* Price + Duration chips */}
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              ₹ {service.price}
            </div>
            <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold text-sm">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>
              {service.duration}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed text-base font-medium">
            {service.description}
          </p>

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-3 tracking-tight">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-gray-700 font-bold text-sm tracking-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer CTA */}
        <div className="shrink-0 px-6 py-5 border-t border-gray-100 bg-white flex items-center gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">Total</span>
            <span className="text-2xl font-black text-gray-900 leading-none">₹ {service.price}</span>
          </div>
          <div className="flex-1">
            <AddToCart
              fullWidth
              product={{
                id: service.id.toString(),
                name: service.title,
                price: service.price,
                image: service.image,
                description: service.description,
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
