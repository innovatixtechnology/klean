import { STORAGE_KEY } from "@/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartImage {
  src?: string;
  alt?: string;
}

export interface CartProduct {
  productId: string;
  name: string;
  qty: number;
  price: number;
  images?: CartImage[];
  description?: string;
  slug?: string;
  subCategorySlug?: string;
  categorySlug?: string;
}

interface Cart {
  products: CartProduct[];
  totalProductsCount: number;
  totalProductsPrice: number;
}

interface CartState {
  cart: Cart;
  serviceDate: string | null;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setServiceDate: (date: Date | null) => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotals = (products: CartProduct[]) => {
  // Count total number of items (sum of quantities)
  const totalProductsCount = products.reduce((sum, p) => sum + p.qty, 0);
  // Calculate total price accurately
  const totalProductsPrice = products.reduce(
    (sum, p) => sum + p.qty * Number(p.price),
    0
  );
  return { totalProductsCount, totalProductsPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        products: [],
        totalProductsCount: 0,
        totalProductsPrice: 0,
      },
      serviceDate: null,
      isLoading: false,

      setLoading: (loading) => set({ isLoading: loading }),

      addProduct: (product) => {
        const { products } = get().cart;
        const existing = products.find((p) => p.productId === product.productId);

        let newProducts: CartProduct[];
        if (existing) {
          // Increment quantity if it already exists
          newProducts = products.map((p) =>
            p.productId === product.productId
              ? { ...p, qty: p.qty + product.qty }
              : p
          );
        } else {
          newProducts = [...products, product];
        }

        set({ cart: { products: newProducts, ...calculateTotals(newProducts) } });
      },

      removeProduct: (productId) => {
        const newProducts = get().cart.products.filter(
          (p) => p.productId !== productId
        );
        set({ cart: { products: newProducts, ...calculateTotals(newProducts) } });
      },

      updateQuantity: (productId, quantity) => {
        const { products } = get().cart;
        if (quantity <= 0) {
          const newProducts = products.filter((p) => p.productId !== productId);
          set({ cart: { products: newProducts, ...calculateTotals(newProducts) } });
          return;
        }

        const newProducts = products.map((p) =>
          p.productId === productId ? { ...p, qty: quantity } : p
        );
        set({ cart: { products: newProducts, ...calculateTotals(newProducts) } });
      },

      setServiceDate: (date) => set({ serviceDate: date ? date.toISOString() : null }),
      
      clearCart: () =>
        set({
          cart: { products: [], totalProductsCount: 0, totalProductsPrice: 0 },
          serviceDate: null,
        }),
    }),
    {
      name: STORAGE_KEY.CART,
      partialize: (state) => ({ 
        cart: state.cart,
        serviceDate: state.serviceDate 
      }),
    }
  )
);
