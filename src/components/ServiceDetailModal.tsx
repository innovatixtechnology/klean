'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { AddToCart } from '@/components/AddToCart';
import { cn, formatCurrency } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import type { Service } from '@/db/schema';

interface IProps {
  service: Service & { categorySlug: string; subCategorySlug: string };
  open: boolean;
}

export function ServiceDetailModal({ service, open }: IProps) {
  const [activeImg, setActiveImg] = useState(0);
  const router = useRouter();

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

  return (
    <Dialog open={open} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 overflow-hidden sm:rounded-[3rem] border-none bg-white max-h-[95dvh] flex flex-col gap-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{service.name}</DialogTitle>
        </DialogHeader>

        {/* Image Carousel */}
        <div className="relative w-full aspect-[16/9] shrink-0 bg-gray-100 overflow-hidden">
          {service.images?.length ? <Image
            src={service.images[activeImg]}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover transition-all duration-500"
            priority
          /> : null}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Navigation arrows — only if multiple images */}
          {service.images && service.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>prev</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>next</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dot indicators */}
          {service.images && service.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {service.images.map((_, i) => (
                <button
                  key={i.toString()}
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
        {service.images && service.images.length > 1 && (
          <div className="flex gap-3 px-6 pt-4 overflow-x-auto scrollbar-hide shrink-0">
            {service.images.map((img, i) => (
              <button
                key={i.toString()}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={`Thumbnail ${i + 1}`}
                className={cn(
                  "relative shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all",
                  i === activeImg ? "border-primary scale-105 shadow-md shadow-primary/20" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`${service.name} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-6">

          {/* Title + Rating */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 leading-tight">
              {service.name}
            </h2>
          </div>

          {/* Price + Duration chips */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">
              {service?.discountedPrice ? formatCurrency(+service?.discountedPrice) : ''}
            </span>

            <del className="text-gray-400">
              {formatCurrency(+service.price)}
            </del>
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed text-base font-medium">
            {service.description}
          </p>
        </div>

        {/* Sticky footer CTA */}
        <div className="shrink-0 px-6 py-5 border-t border-gray-100 bg-white flex items-center gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">Total</span>
            <span className="text-2xl font-black text-gray-900 leading-none">{formatCurrency(service.discountedPrice ? +service.discountedPrice : +service.price)}</span>
          </div>
          <div className="flex-1">
            <AddToCart
              fullWidth
              product={{
                id: service.id.toString(),
                name: service.name,
                price: service.discountedPrice ?? service.price,
                image: service.images?.[0],
                description: service.description ?? '',
                slug: service.slug ?? '',
                subCategorySlug: service.subCategorySlug ?? '',
                categorySlug: service.categorySlug ?? '',
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
