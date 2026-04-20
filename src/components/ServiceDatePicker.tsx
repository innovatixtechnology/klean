"use client";

import { useCallback, useRef } from "react";
import { useCartStore } from "@/stores/cart";
import { CalendarIcon, ClockIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface ServiceDatePickerProps {
  className?: string;
  compact?: boolean;
}

/**
 * Helper to get local ISO string (YYYY-MM-DDTHH:mm) for datetime-local inputs
 */
const toLocalISO = (date: Date) => {
  try {
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
    return localISOTime;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export function ServiceDatePicker({ className, compact = false }: ServiceDatePickerProps) {
  const { serviceDate: serviceDateStr, setServiceDate } = useCartStore();
  const dateRef = useRef<HTMLInputElement>(null);

  const serviceDate = serviceDateStr ? new Date(serviceDateStr) : null;
  const isValidDate = serviceDate && !isNaN(serviceDate.getTime());

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setServiceDate(null);
  }, [setServiceDate]);

  const handleOpenPicker = useCallback(() => {
    if (dateRef.current) {
      try {
        if ('showPicker' in dateRef.current) {
          (dateRef.current as any).showPicker();
        } else {
          dateRef.current?.focus?.();
          dateRef.current?.click?.();
        }
      } catch (err) {
        dateRef.current?.focus();
        dateRef.current?.click();
      }
    }
  }, []);

  const inputProps = {
    ref: dateRef,
    type: "datetime-local" as const,
    className: "absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20",
    value: isValidDate ? toLocalISO(serviceDate) : "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setServiceDate(val ? new Date(val) : null);
    },
    min: toLocalISO(new Date()),
    onClick: (e: React.MouseEvent) => {
      try {
        (e.target as any).showPicker?.();
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (compact) {
    return (
      <div className={cn("relative group", className)}>
        <button
          type="button"
          onClick={handleOpenPicker}
          className={cn(
            "flex items-center gap-3 px-6 py-3.5 w-full rounded-2xl font-black transition-all group-active:scale-95 cursor-pointer",
            isValidDate ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-primary/10 text-primary border border-primary/20"
          )}
        >
          <div className="shrink-0 relative z-10 pointer-events-none">
            {!isValidDate ? <CalendarIcon size={18} /> : <ClockIcon size={18} />}
          </div>
          <div className="flex-1 text-left relative z-10 pointer-events-none">
            {isValidDate ? (
              <span className="text-sm">
                {serviceDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {serviceDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </span>
            ) : (
              <span className="text-sm">Pick Date & Time</span>
            )}
          </div>
          {isValidDate && (
            <button
              type="button"
              onClick={handleClear}
              className="relative z-30 p-1 hover:bg-white/20 rounded-lg transition-colors pointer-events-auto"
            >
              <span className="text-[10px] uppercase font-bold">Clear</span>
            </button>
          )}
        </button>
        <input {...inputProps} />
      </div>
    );
  }

  return (
    <button
      type="button" 
      className={cn("p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 relative overflow-hidden", className)}
      onClick={handleOpenPicker}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

      <div className="flex items-center justify-between mb-4 leading-none relative">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] pointer-events-none">Schedule Service</span>
        {isValidDate && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] font-bold text-gray-400 hover:text-primary transition-colors relative z-30 pointer-events-auto"
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative group/input cursor-pointer">
        <div className="flex items-start gap-4 text-left w-full relative z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-primary group-hover/input:bg-primary group-hover/input:text-white transition-all duration-300 transform group-hover/input:scale-105">
            {!isValidDate ? <CalendarIcon size={20} /> : <ClockIcon size={20} />}
          </div>

          <div className="flex-1 min-w-0 py-0.5">
            {isValidDate ? (
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

        <input {...inputProps} />
      </div>
    </button>
  );
}
