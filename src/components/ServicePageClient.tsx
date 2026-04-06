"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cart";
import { CATEGORY } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import { AddToCart } from "@/components/AddToCart";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";

interface MockService {
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

interface ServicePageClientProps {
  currentCategory: typeof CATEGORY[0];
  mockServices: MockService[];
}

export default function ServicePageClient({ currentCategory, mockServices }: ServicePageClientProps) {
  const { updateQuantity, cart } = useCartStore();
  const [selectedService, setSelectedService] = useState<MockService | null>(null);

  return (
    <div className="bg-gray-50/50 min-h-screen font-inter">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-16 flex gap-10 h-[calc(100vh-70px)] sticky top-[70px] overflow-hidden">
        
        {/* LEFT: Fixed Categories Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 h-full overflow-y-auto pt-10 border-r border-gray-200 pr-8 scrollbar-hide">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Categories</h2>
          <div className="flex flex-col gap-2">
            {CATEGORY.map((cat) => (
              <Link
                key={cat.slug}
                href={`/service/${cat.slug}` as Route}
                className={cn(
                  "p-4 rounded-2xl text-sm font-semibold transition-all duration-300",
                  currentCategory.slug === cat.slug
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                    : "text-gray-600 hover:bg-white hover:shadow-md hover:scale-[1.02] active:scale-95"
                )}
              >
                {cat.text}
              </Link>
            ))}
          </div>
        </aside>

        {/* MID: Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pt-10 pb-32 h-full">
          <div className="lg:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-4">
            {CATEGORY.map((cat) => (
              <Link
                key={cat.slug}
                href={`/service/${cat.slug}` as Route}
                className={cn(
                  "px-5 py-2.5 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300",
                  currentCategory.slug === cat.slug
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                )}
              >
                {cat.text}
              </Link>
            ))}
          </div>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">{currentCategory.text}</h1>
            <p className="text-gray-500 text-lg">Choose from our premium packages and professional services.</p>
          </div>

          <div className="grid gap-6">
            {mockServices.map((service, index) => (
              <div 
                key={service.id} 
                className={cn(
                  "group flex flex-col md:flex-row gap-6 p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/40 fade-in-up",
                  index === 0 ? "delay-0" : 
                  index === 1 ? "delay-100" :
                  index === 2 ? "delay-200" :
                  index === 3 ? "delay-300" : "delay-400"
                )}
              >
                {/* Clickable image area opens modal */}
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="relative w-full md:w-48 h-48 rounded-3xl overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label={`View details for ${service.title}`}
                >
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Image count badge */}
                  {service.images && service.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                      +{service.images.length} photos
                    </div>
                  )}
                </button>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">{service.title}</h3>
                      <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        ★ {service.rating} ({service.reviews})
                      </div>
                    </div>
                    <p className="text-gray-500 line-clamp-2 mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5 font-bold text-gray-900">₹ {service.price}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      <span className="flex items-center gap-1.5 text-gray-400 font-medium"><svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><title>Duration</title><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg> {service.duration}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="px-5 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-primary hover:text-primary transition-all active:scale-95"
                    >
                      View Details
                    </button>
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
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* RIGHT: Fixed Summary Sidebar */}
        <aside className="hidden xl:flex flex-col w-96 h-full pt-10 pl-8 border-l border-gray-200">
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 transition-all hover:shadow-2xl hover:shadow-gray-300/30 flex flex-col max-h-[85%]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 shrink-0">
              Cart Summary <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{cart.totalProductsCount} items</span>
            </h2>
            
            {cart.products.length > 0 ? (
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col gap-4 mb-6">
                {cart.products.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <Image src={item.images?.[0]?.src || "/images/salon-at-home.webp"} alt={item.name} fill sizes="64px" className="object-cover" />
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
                <p className="text-gray-400 text-sm font-medium">Your cart is feeling light.<br/>Add services to get started!</p>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-100 bg-white">
              {cart.products.length > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Total Amount</span>
                  <span className="text-2xl font-black text-gray-900">₹ {cart.totalProductsPrice}</span>
                </div>
              )}
              <button 
                type="button" 
                disabled={cart.products.length === 0}
                className={cn(
                  "w-full py-4 rounded-full font-bold transition-all transform active:scale-95 shadow-lg",
                  cart.products.length > 0 
                    ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                {cart.products.length > 0 ? "Proceed to Checkout" : "Select address to proceed"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Fixed Checkout CTA */}
      {cart.products.length > 0 && (
        <div className="xl:hidden fixed bottom-6 left-4 right-4 p-4 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] z-40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col pl-2">
               <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{cart.totalProductsCount} items</span>
               <span className="text-xl font-black text-gray-900 leading-tight">₹ {cart.totalProductsPrice}</span>
            </div>
            <button 
              type="button" 
              className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/25 transition-transform active:scale-95 flex-1 max-w-[200px] text-center"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
}

