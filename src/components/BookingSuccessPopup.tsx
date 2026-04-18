"use client";

import { useEffect } from "react";

interface Props {
    show: boolean;
    onClose: () => void;
}

export function BookingSuccessPopup({ show, onClose }: Props) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="animate-in fade-in zoom-in-95 mx-4 flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-10 shadow-2xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
                    ✓
                </div>
                <h3 className="text-lg font-bold text-gray-900">Booking Confirmed!</h3>
                <p className="text-sm text-gray-500">We&apos;ll get back to you shortly.</p>
            </div>
        </div>
    );
}
