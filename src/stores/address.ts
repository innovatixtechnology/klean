import { STORAGE_KEY } from "@/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/db/schema";

interface AddressState {
  addresses: Omit<
    Address,
    "createdAt" | "updatedAt"
  >[] & { name?: string, phone?: string };
  selectedAddressId: string | null;
  addAddress: (address: Address) => void;
  setAddresses: (addresses: Address[]) => void;
  removeAddress: (id: string) => void;
  setSelectedAddress: (id: string) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],
      selectedAddressId: null,

      addAddress: (address) => {
        set((state) => ({
          addresses: Array.from(
            new Map(
              [...state.addresses, address].map((a) => [a.id, a])
            ).values()
          ),
          selectedAddressId: state.selectedAddressId ?? address.id,
        }));
      },
      setAddresses: (addresses) => {
        set((state) => ({
          addresses: Array.from(
            new Map(
              [...state.addresses, ...addresses].map((a) => [a.id, a])
            ).values()
          ),
          selectedAddressId: state.selectedAddressId ?? addresses?.[0]?.id,
        }));
      },
      removeAddress: (id) => {
        set((state) => {
          const newAddresses = state.addresses.filter((a) => a.id !== id);
          let newSelectedId = state.selectedAddressId;
          if (newSelectedId === id) {
            newSelectedId = newAddresses.length > 0 ? newAddresses?.[0]?.id : null;
          }
          return {
            addresses: newAddresses,
            selectedAddressId: newSelectedId,
          };
        });
      },

      setSelectedAddress: (id) => set({ selectedAddressId: id }),

      updateAddress: (id, updatedFields) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...updatedFields } : a
          ),
        }));
      },
    }),
    {
      name: STORAGE_KEY.ADDRESS,
    }
  )
);
