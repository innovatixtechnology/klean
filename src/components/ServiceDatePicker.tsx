"use client";

import { useCallback, useRef } from "react";
import { useCartStore } from "@/stores/cart";
import { CalendarIcon, ClockIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ServiceDatePickerProps {
  className?: string;
  compact?: boolean;
}

export function ServiceDatePicker({ className, compact = false }: ServiceDatePickerProps) {
  const { serviceDate: serviceDateStr, setServiceDate } = useCartStore();
  const dateRef = useRef<HTMLInputElement>(null);

  const serviceDate = serviceDateStr ? new Date(serviceDateStr) : null;

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setServiceDate(null);
  }, [setServiceDate]);

  if (compact) {
    return (
      <div className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => dateRef.current?.showPicker()}
          className={cn(
            "flex items-center gap-3 px-6 py-3.5 w-full rounded-2xl font-black transition-all active:scale-95",
            serviceDate ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-primary/10 text-primary border border-primary/20"
          )}
        >
          <div className="shrink-0">
            {!serviceDate ? <CalendarIcon size={18} /> : <ClockIcon size={18} />}
          </div>
          <div className="flex-1 text-left">
            {serviceDate && !isNaN(serviceDate.getTime()) ? (
              <span className="text-sm">
                {serviceDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {serviceDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
            ) : (
              <span className="text-sm">Pick Date & Time</span>
            )}
          </div>
          {serviceDate && (
            <button type="button" onClick={handleClear} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <span className="text-[10px] uppercase font-bold">Clear</span>
            </button>
          )}
        </button>
        <input
          ref={dateRef}
          type="datetime-local"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20 pointer-events-none"
          value={serviceDate ? new Date(serviceDate.getTime() - serviceDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
          onChange={(e) => {
            const val = e.target.value;
            setServiceDate(val ? new Date(val) : null);
          }}
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
    );
  }

  return (
    <div className={cn("p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="flex items-center justify-between mb-4 leading-none relative">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Schedule Service</span>
        {serviceDate && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors relative z-30"
          >
            Clear
          </button>
        )}
      </div>

      <div
        className="relative group/input cursor-pointer"
      >
        <div className="flex items-start gap-4 text-left w-full relative z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-primary group-hover/input:bg-primary group-hover/input:text-white transition-all duration-300 transform group-hover/input:scale-105">
            {!serviceDate ? <CalendarIcon size={20} /> : <ClockIcon size={20} />}
          </div>

          <div className="flex-1 min-w-0 py-0.5">
            {serviceDate && !isNaN(serviceDate.getTime()) ? (
              <>
                <p className="font-black text-gray-900 leading-tight mb-1">
                  {serviceDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
                <p className="text-[11px] text-gray-500 font-bold tracking-tight opacity-70 italic">
                  at {serviceDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </>
            ) : (
              <>
                <p className="font-black text-gray-900 leading-tight mb-1">Select Date & Time</p>
                <p className="text-xs text-gray-500 font-bold tracking-tight opacity-70 italic">When should we arrive?</p>
              </>
            )}
          </div>
        </div>

        <input
          ref={dateRef}
          type="datetime-local"
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
          value={serviceDate ? new Date(serviceDate.getTime() - serviceDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
          onChange={(e) => {
            const val = e.target.value;
            setServiceDate(val ? new Date(val) : null);
          }}
          min={new Date().toISOString().slice(0, 16)}
          onClick={(e) => (e.target as any).showPicker?.()}
        />
      </div>
    </div>
  );
}
