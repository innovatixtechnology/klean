"use client";

import { AddressSelectionDialog } from "@/components/AddressSelectionDialog";
import { useAddressStore } from "@/stores/address";
import { useCartStore } from "@/stores/cart";
import { cn, formatCurrency, MIN_CART_VALUE } from "@/lib/utils";
import { useCallback, useReducer, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "@/actions";
import { BookingSuccessPopup } from "@/components/BookingSuccessPopup";
import { ServiceDatePicker } from "@/components/ServiceDatePicker";

export default function MobileCheckout() {
  const { cart, serviceDate: serviceDateStr } = useCartStore();
  const { selectedAddressId } = useAddressStore();
  const [loading, toggleLoading] = useReducer(prev => !prev, false);
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceDate = serviceDateStr ? new Date(serviceDateStr) : null;

  const handleCheckout = async () => {
    try {
      toggleLoading();
      if (cart.products.length === 0) {
        toast.error("Please add services to your cart");
        return;
      }

      if (cart.totalProductsPrice < MIN_CART_VALUE) {
        toast.error(`Minimum cart value is ₹${MIN_CART_VALUE}`);
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
        }))
      })

      if (res.success) {
        useCartStore.getState().clearCart();
        setShowSuccess(true);
      } else {
        toast.error(res.error);
      }

    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      toggleLoading();
    }
  };

  const closeSuccess = useCallback(() => setShowSuccess(false), []);

  return (
    <>
      <BookingSuccessPopup show={showSuccess} onClose={closeSuccess} />
      <div className="xl:hidden fixed bottom-6 left-4 right-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-40 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-gray-50">
          <AddressSelectionDialog
            trigger={
              <button
                type="button"
                className={cn(
                  "px-4 py-3 w-full rounded-2xl font-black text-xs transition-transform active:scale-95 text-center truncate",
                  selectedAddressId ? "bg-primary/10 text-primary border border-primary/20" : "bg-primary/10 text-primary"
                )}
              >
                {selectedAddressId ? "Change Address" : "Add Address"}
              </button>
            }
          />
          <ServiceDatePicker compact />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col pl-2">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{cart.totalProductsCount} items</span>
            <span className="text-xl font-black text-gray-900 leading-tight">{formatCurrency(cart.totalProductsPrice)}</span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || !selectedAddressId || !serviceDate}
            className={cn(
              "px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-primary/25 transition-transform active:scale-95 flex-1 max-w-[200px] text-center",
              selectedAddressId && serviceDate ? "bg-primary text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {loading ? "Loading..." : "Checkout"}
          </button>
        </div>
      </div>
    </>
  )
}