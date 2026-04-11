"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { useAddressStore } from "@/stores/address";
import { AddressSelectionDialog } from "@/components/AddressSelectionDialog";
import { MapPinIcon, ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useReducer } from "react";
import { createBooking, getUserProfile } from "@/actions";
import { useSessionStore } from "@/stores/session";

export default function ServiceCart() {
  const { updateQuantity, cart } = useCartStore();
  const { addresses, selectedAddressId, setAddresses } = useAddressStore();
  const session = useSessionStore(s => s.session);
  const [loading, toggleLoading] = useReducer(prev => !prev, false);

  const selectedAddress = addresses?.find?.(a => a.id === selectedAddressId);

  useEffect(() => {
    if (session?.id) {
      (async () => {
        const res = await getUserProfile(session.id);
        if (res.success) {
          setAddresses(res.user?.addresses || []);
        }
      })()
    }
  }, [session?.id, setAddresses])

  const handleCheckout = async () => {
    try {
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

      toggleLoading();
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
    <aside className="hidden xl:flex flex-col w-96 h-full pt-10 pl-8 border-l border-gray-200">
      <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-gray-300/30 flex flex-col max-h-[85%]">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 shrink-0">
          Cart Summary <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{cart.totalProductsCount} items</span>
        </h2>

        {cart.products.length > 0 ? (
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col gap-4 mb-6">
            {cart.products.map((item) => (
              <div key={item.productId} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm bg-gray-100">
                  {item.images?.[0]?.src ? <Image src={item.images?.[0]?.src} alt={item.name} fill sizes="64px" className="object-cover" /> : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-2xl">📷</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold text-primary">₹ {item.price * item.qty}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => updateQuantity(item.productId, item.qty - 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary hover:text-white text-xs font-bold">-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.qty + 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary hover:text-white text-xs font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><title>Empty Cart</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <p className="text-gray-400 text-sm font-medium">Your cart is feeling light.<br />Add services to get started!</p>
          </div>
        )}

        {/* Address Selection */}
        <div className="mt-6 mb-8 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 group transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/40">
          <div className="flex items-center justify-between mb-3 leading-none">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Location</span>
            <AddressSelectionDialog
              trigger={
                <button type='button' className="text-primary text-[10px] font-black uppercase tracking-wider hover:underline flex items-center gap-1">
                  {selectedAddress ? "Change" : "Add"} <ArrowRightIcon size={12} />
                </button>
              }
            />
          </div>

          <AddressSelectionDialog
            trigger={
              <button type='button' className="flex items-start gap-4 text-left w-full group/btn">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300 transform group-hover/btn:scale-105">
                  <MapPinIcon size={20} />
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  {selectedAddress ? (
                    <>
                      <p className="font-black text-gray-900 truncate leading-tight mb-1">{selectedAddress.category || "Address"}</p>
                      <p className="text-[11px] text-gray-500 font-bold truncate tracking-tight opacity-70 italic">
                        {selectedAddress.addressLine1}{selectedAddress.addressLine2 ? `, ${selectedAddress.addressLine2}` : ""}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-black text-gray-900 leading-tight mb-1">Select Address</p>
                      <p className="text-[11px] text-gray-500 font-bold tracking-tight opacity-70 italic">To see accurate availability</p>
                    </>
                  )}
                </div>
              </button>
            }
          />
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100 bg-white">
          {cart.products.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Total Amount</span>
              <span className="text-2xl font-black text-gray-900">₹ {cart.totalProductsPrice}</span>
            </div>
          )}
          <button
            type="button"
            disabled={cart.products.length === 0 || !selectedAddressId || loading}
            onClick={handleCheckout}
            className={cn(
              "w-full py-5 rounded-full cursor-pointer font-black text-lg transition-all transform active:scale-95 shadow-xl",
              (cart.products.length > 0 && selectedAddressId)
                ? "bg-primary text-white hover:bg-primary/90 shadow-primary/25"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {loading ? "Loading..." : cart.products.length === 0
              ? "Select Services"
              : !selectedAddressId
                ? "Select Address"
                : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </aside>
  )
}

// const createOrderId = async () => {
//   try {
//    const response = await fetch('/api/order', {
//     method: 'POST',
//     headers: {
//      'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//      amount: parseFloat(amount)*100,
//     })
//    });

//    if (!response.ok) {
//     throw new Error('Network response was not ok');
//    }

//    const data = await response.json();
//    return data.orderId;
//   } catch (error) {
//    console.error('There was a problem with your fetch operation:', error);
//   }
//  };

// const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//    const orderId: string = await createOrderId();
//    const options = {
//     key: process.env.key_id,
//     amount: parseFloat(amount) * 100,
//     currency: currency,
//     name: 'name',
//     description: 'description',
//     order_id: orderId,
//     handler: async function (response: any) {
//      const data = {
//       orderCreationId: orderId,
//       razorpayPaymentId: response.razorpay_payment_id,
//       razorpayOrderId: response.razorpay_order_id,
//       razorpaySignature: response.razorpay_signature,
//      };

//      const result = await fetch('/api/verify', {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' },
//      });
//      const res = await result.json();
//      if (res.isOk) alert("payment succeed");
//      else {
//       alert(res.message);
//      }
//     },
//     prefill: {
//      name: name,
//      email: email,
//     },
//     theme: {
//      color: '#3399cc',
//     },
//    };
//    const paymentObject = new window.Razorpay(options);
//    paymentObject.on('payment.failed', function (response: any) {
//     alert(response.error.description);
//    });
//    paymentObject.open();
//   } catch (error) {
//    console.log(error);
//   }
//  };
