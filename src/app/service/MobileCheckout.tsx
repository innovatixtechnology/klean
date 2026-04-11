"use client";

import { AddressSelectionDialog } from "@/components/AddressSelectionDialog";
import { useAddressStore } from "@/stores/address";
import { useCartStore } from "@/stores/cart";
import { cn } from "@/lib/utils";
import { useReducer } from "react";
import { toast } from "sonner";
import { createBooking } from "@/actions";

export default function MobileCheckout() {
  const { cart } = useCartStore();
  const { selectedAddressId } = useAddressStore();
  const [loading, toggleLoading] = useReducer(prev => !prev, false);


  const handleCheckout = async () => {
    try {
      toggleLoading();
      if (cart.products.length === 0) {
        toast.error("Please add services to your cart");
        return;
      }

      // if (!session?.email) {
      //   const categorySlug = cart.products[0].categorySlug ?? '';
      //   return router.push(`/sign-in?redirect=/service/${categorySlug}`);
      // }

      if (!selectedAddressId) {
        toast.error("Please select an address");
        return;
      }

      const res = await createBooking({
        addressId: selectedAddressId,
        items: cart.products.map((item) => ({
          serviceId: item.productId,
          quantity: item.qty,
          price: item.price.toString(),
        }))
      })

      if (res.success) {
        useCartStore.getState().clearCart();
        toast.success("Booking created successfully");
      } else {
        toast.error(res.error);
      }

    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="xl:hidden fixed bottom-6 left-4 right-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-40">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col pl-2">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{cart.totalProductsCount} items</span>
          <span className="text-xl font-black text-gray-900 leading-tight">₹ {cart.totalProductsPrice}</span>
        </div>
        {!selectedAddressId ? <AddressSelectionDialog
          trigger={
            <button
              type="button"
              className={cn(
                "px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-primary/25 transition-transform active:scale-95 flex-1 max-w-[200px] text-center",
                selectedAddressId ? "bg-primary text-white" : "bg-primary/10 text-primary"
              )}
            >
              Add Address
            </button>
          }
        /> : <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className={cn(
            "px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-primary/25 transition-transform active:scale-95 flex-1 max-w-[200px] text-center",
            selectedAddressId ? "bg-primary text-white" : "bg-primary/10 text-primary"
          )}
        >
          {loading ? "Loading..." : "Checkout"}
        </button>}
      </div>
    </div>
  )
}