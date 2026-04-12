'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPinIcon } from '@/components/icons';
import { useAddressStore } from '@/stores/address';
import { updateUserAddress } from '@/actions';
import { toast } from 'sonner';
import { useSessionStore } from '@/stores/session';

interface AddressDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddressDialog({ trigger, open: controlledOpen, onOpenChange }: Readonly<AddressDialogProps>) {
  const [internalOpen, setInternalOpen] = useState(false);
  const user = useSessionStore((state) => state.session);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const addAddress = useAddressStore((state) => state.addAddress);

  const [state, formAction, pending] = useActionState<any, FormData>(updateUserAddress, { error: '' });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (state?.success) {
      addAddress(state.address)
      toast.success("Address added successfully")
      setOpen(false)
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state?.success, state?.error])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent aria-describedby="Add New Address" className="max-w-[calc(100%-1rem)] sm:max-w-[calc(100%-2rem)] md:max-w-lg p-0 overflow-hidden sm:rounded-[2.5rem] border-none bg-white shadow-2xl mx-2 sm:mx-4 max-h-[75vh] flex flex-col">
        <DialogHeader className="px-4 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 shrink-0">
          <DialogTitle className="text-xl sm:text-2xl font-black flex items-center gap-2 sm:gap-3 tracking-tight">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <MapPinIcon size={16} className="sm:w-5 sm:h-5" />
            </div>
            <span className="text-lg sm:text-xl">Add New Address</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-8">
          <form id="address-form" action={formAction} className="space-y-4 sm:space-y-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Name</Label>
                <Input id="name" name="name" defaultValue={state?.name || `${user?.firstName ?? ''} ${user?.lastName ?? ''}`} required placeholder="John Doe" className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone</Label>
                <Input id="phone" name="phone" defaultValue={state?.phone || user?.phoneNumber || ''} required placeholder="1234567890" className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="houseNo" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">House No. / Flat / Building</Label>
              <Input id="houseNo" name="addressLine1" required placeholder="A-123, Sunny Apartments" defaultValue={state?.addressLine1} className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Area / Street / Sector</Label>
              <Input id="area" name="addressLine2" required placeholder="Sector 45, Gurgaon" defaultValue={state?.addressLine2} className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Pincode</Label>
                <Input id="pincode" name="pincode" required placeholder="110001" defaultValue={state?.pincode} className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">City</Label>
                <Input id="city" name="city" readOnly value={"Vijayapura"} placeholder="New Delhi" className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">State</Label>
                <Input id="state" readOnly name="state" value={"KARNATAKA"} placeholder="Vijayapura" className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Country</Label>
                <Input id="country" readOnly value={"INDIA"} name="country" placeholder="India" className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Category</Label>
                <Input id="category" name="category" required placeholder="Home" defaultValue={state?.category} className="rounded-xl sm:rounded-2xl border-gray-100 bg-gray-50/50 py-3 sm:py-5 focus:bg-white text-sm sm:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isDefault" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Is Default</Label>
                <div className="flex items-center gap-2 h-full">
                  <input type="checkbox" id="isDefault" name="isDefault" defaultChecked={state?.isDefault} className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                  <Label htmlFor="isDefault" className="text-sm sm:text-base">Yes</Label>
                </div>
              </div>
            </div>

          </form>        </div>

        <div className="px-4 sm:px-8 pb-4 shrink-0 border-t border-gray-100 bg-white">
          <Button isLoading={pending} disabled={pending} type="submit" form="address-form" className="w-full text-white text-sm sm:text-base font-medium rounded-xl sm:rounded-2xl">
            Save Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
