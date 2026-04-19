"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "sonner";
import type { Route } from "next";
import { useCartStore } from "@/stores/cart";
import { useAddressStore } from "@/stores/address";
import { useSessionStore } from "@/stores/session";
import { createBooking, getUserProfile } from "@/actions";
import { AddressSelectionDialog } from "@/components/AddressSelectionDialog";
import { BookingSuccessPopup } from "@/components/BookingSuccessPopup";
import { ServiceDatePicker } from "@/components/ServiceDatePicker";
import {
    ShoppingCartIcon,
    Trash2Icon,
    PlusIcon,
    MinusIcon,
    MapPinIcon,
    ArrowRightIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { cart, updateQuantity, removeProduct, serviceDate: serviceDateStr } = useCartStore();
    const { addresses, selectedAddressId, setAddresses } = useAddressStore();
    const session = useSessionStore((s) => s.session);
    const [loading, toggleLoading] = useReducer((prev) => !prev, false);
    const [showSuccess, setShowSuccess] = useState(false);

    const serviceDate = serviceDateStr ? new Date(serviceDateStr) : null;
    const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

    useEffect(() => {
        if (session?.id) {
            (async () => {
                const res = await getUserProfile(session.id);
                if (res.success) {
                    setAddresses(res.user?.addresses || []);
                }
            })();
        }
    }, [session?.id, setAddresses]);

    const handleCheckout = async () => {
        try {
            toggleLoading();

            if (cart.products.length === 0) {
                toast.error("Please add services to your cart");
                return;
            }

            if (!selectedAddressId) {
                toast.error("Please select an address");
                return;
            }

            if (!serviceDate) {
                toast.error("Please select a date and time for service");
                return;
            }

            const res = await createBooking({
                addressId: selectedAddressId,
                scheduledAt: serviceDate,
                items: cart.products.map((item) => ({
                    serviceId: item.productId,
                    quantity: item.qty,
                    price: item.price.toString(),
                })),
            });

            if (res.success) {
                useCartStore.getState().clearCart();
                setShowSuccess(true);
            } else {
                toast.error(res.error);
            }
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            toggleLoading();
        }
    };

    const closeSuccess = useCallback(() => setShowSuccess(false), []);

    return (
        <>
            <BookingSuccessPopup show={showSuccess} onClose={closeSuccess} />

            <main className="min-h-screen bg-gray-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                    {/* Page header */}
                    <div className="mb-10">
                        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                            Your Cart
                        </h1>
                        {cart.products.length > 0 && (
                            <p className="text-gray-500 mt-1 font-medium">
                                {cart.totalProductsCount}{" "}
                                {cart.totalProductsCount === 1 ? "item" : "items"} in your cart
                            </p>
                        )}
                    </div>

                    {cart.products.length === 0 ? (
                        /* ── Empty state ── */
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                <ShoppingCartIcon className="w-10 h-10 text-primary" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500 mb-8 max-w-xs">
                                Browse our services and add something you love.
                            </p>
                            <Link
                                href={"/#services" as Route}
                                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Explore Services
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        /* ── Cart layout ── */
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Left: Cart items */}
                            <section className="flex-1 flex flex-col gap-4">
                                {cart.products.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex gap-4 hover:shadow-md transition-shadow"
                                    >
                                        {/* Image */}
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100 shadow-sm">
                                            {item.images?.[0]?.src ? (
                                                <Image
                                                    src={item.images[0].src}
                                                    alt={item.images[0].alt ?? item.name}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                                    🧹
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                                                        {item.name}
                                                    </h3>
                                                    {item.description && (
                                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${item.name}`}
                                                    onClick={() => removeProduct(item.productId)}
                                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                                                >
                                                    <Trash2Icon className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                {/* Qty control */}
                                                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 h-9 px-1 gap-1">
                                                    <button
                                                        type="button"
                                                        aria-label="Decrease quantity"
                                                        onClick={() =>
                                                            updateQuantity(item.productId, item.qty - 1)
                                                        }
                                                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                                    >
                                                        <MinusIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-bold text-gray-900">
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label="Increase quantity"
                                                        onClick={() =>
                                                            updateQuantity(item.productId, item.qty + 1)
                                                        }
                                                        className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                                                    >
                                                        <PlusIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <p className="font-black text-gray-900 text-base sm:text-lg">
                                                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Right: Order summary */}
                            <aside className="w-full lg:w-90 shrink-0 sticky top-24">
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 sm:p-8 flex flex-col gap-6">
                                    <h2 className="text-xl font-black text-gray-900">
                                        Order Summary
                                    </h2>

                                    {/* Price breakdown */}
                                    <div className="flex flex-col gap-3 text-sm">
                                        {cart.products.map((item) => (
                                            <div
                                                key={item.productId}
                                                className="flex justify-between text-gray-600"
                                            >
                                                <span className="truncate max-w-[60%]">
                                                    {item.name}{" "}
                                                    <span className="text-gray-400">× {item.qty}</span>
                                                </span>
                                                <span className="font-semibold text-gray-800">
                                                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-gray-900 text-base">
                                            <span>Total</span>
                                            <span>
                                                ₹{cart.totalProductsPrice.toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                            Schedule & Location
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <ServiceDatePicker />
                                            <AddressSelectionDialog
                                                trigger={
                                                    <button
                                                        type="button"
                                                        className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-gray-300 hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                            <MapPinIcon className="w-4 h-4 text-primary" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            {selectedAddress ? (
                                                                <>
                                                                    <p className="font-bold text-sm text-gray-900 truncate">
                                                                        {selectedAddress.addressLine1}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 truncate">
                                                                        {[
                                                                            selectedAddress.city,
                                                                            selectedAddress.state,
                                                                            selectedAddress.pincode,
                                                                        ]
                                                                            .filter(Boolean)
                                                                            .join(", ")}
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="font-bold text-sm text-gray-900">
                                                                        Select Address
                                                                    </p>
                                                                    <p className="text-xs text-gray-400 italic">
                                                                        Required for checkout
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </button>
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Checkout button */}
                                    <button
                                        type="button"
                                        disabled={
                                            cart.products.length === 0 ||
                                            !selectedAddressId ||
                                            !serviceDate ||
                                            loading
                                        }
                                        onClick={handleCheckout}
                                        className={cn(
                                            "w-full py-4 rounded-full font-black text-base transition-all transform active:scale-95 shadow-xl",
                                            cart.products.length > 0 && selectedAddressId && serviceDate
                                                ? "bg-primary text-white hover:bg-primary/90 shadow-primary/25 cursor-pointer"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        )}
                                    >
                                        {loading
                                            ? "Processing..."
                                            : !selectedAddressId
                                                ? "Select Address to Continue"
                                                : !serviceDate
                                                ? "Select Date & Time"
                                                : "Proceed to Checkout"}
                                    </button>

                                    <Link
                                        href={"/#services" as Route}
                                        className="text-center text-sm text-primary font-semibold hover:underline"
                                    >
                                        ← Continue Shopping
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
