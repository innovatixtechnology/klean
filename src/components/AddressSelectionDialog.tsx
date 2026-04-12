'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, MapPinIcon, CheckIcon, Trash2Icon } from '@/components/icons';
import { useAddressStore } from '@/stores/address';
import { cn } from '@/lib/utils';
import { AddressDialog } from './AddressDialog';
import { useState } from 'react';

interface AddressSelectionDialogProps {
  trigger?: React.ReactNode;
}

export function AddressSelectionDialog({ trigger }: Readonly<AddressSelectionDialogProps>) {
  const { addresses, selectedAddressId, setSelectedAddress, removeAddress } = useAddressStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

  const handleAddAddress = () => {
    // if (!session?.email) {
    //   const categorySlug = cart.products[0].categorySlug ?? '';
    //   toast.error("Please login to add address");
    //   return router.push(`/sign-in?redirect=/service/${categorySlug}`);
    // }
    setIsAddOpen(true)
  }

  return (
    <>
      <Dialog open={isSelectionOpen} onOpenChange={setIsSelectionOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent aria-describedby="Select Address" className="max-w-[calc(100%-2rem)] sm:max-w-lg p-0 overflow-hidden sm:rounded-[2.5rem] border-none bg-white shadow-2xl flex flex-col max-h-[85vh]">
          <DialogHeader className="px-8 pt-8 pb-4 shrink-0">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-black flex items-center gap-3 tracking-tight">
                Select Address
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAddAddress}
                className="text-primary font-bold hover:bg-primary/10 rounded-full pr-4"
              >
                <PlusIcon className="mr-1 h-4 w-4" /> Add New
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
            {addresses.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <MapPinIcon size={32} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">No addresses yet</p>
                  <p className="text-sm text-gray-500">Add an address to proceed with your booking</p>
                </div>
                <Button onClick={handleAddAddress} className="rounded-full px-8 bg-primary text-white">
                  Add Address
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="relative group">
                    <button
                      type='button'
                      onClick={() => {
                        setSelectedAddress(address.id);
                        setIsSelectionOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-5 rounded-4xl border-2 transition-all cursor-pointer",
                        selectedAddressId === address.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex justify-between items-start pr-8">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-gray-900">{address.category || "Address"}</span>
                            {selectedAddressId === address.id && (
                              <span className="bg-primary text-white p-0.5 rounded-full">
                                <CheckIcon size={12} />
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}<br />
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-gray-900 font-bold mt-2 flex items-center gap-2">
                            {address.country}
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAddress(address.id);
                      }}
                      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 rounded-full hover:bg-red-50"
                      aria-label="Delete address"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AddressDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      />
    </>
  );
}
