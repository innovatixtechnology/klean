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

export function AddressDialog({ trigger, open: controlledOpen, onOpenChange }: AddressDialogProps) {
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
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg p-0 overflow-hidden sm:rounded-[2.5rem] border-none bg-white shadow-2xl">
        <DialogHeader className="px-8 pt-8 pb-4">
          <DialogTitle className="text-2xl font-black flex items-center gap-3 tracking-tight">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <MapPinIcon size={20} />
            </div>
            Add New Address
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="px-8 pb-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Name</Label>
              <Input id="name" name="name" defaultValue={state?.name || `${user?.firstName ?? ''} ${user?.lastName ?? ''}`} required placeholder="John Doe" className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Phone</Label>
              <Input id="phone" name="phone" defaultValue={state?.phone || user?.phoneNumber || ''} required placeholder="1234567890" className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="houseNo" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">House No. / Flat / Building</Label>
            <Input id="houseNo" name="addressLine1" required placeholder="A-123, Sunny Apartments" defaultValue={state?.addressLine1} className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Area / Street / Sector</Label>
            <Input id="area" name="addressLine2" required placeholder="Sector 45, Gurgaon" defaultValue={state?.addressLine2} className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Pincode</Label>
              <Input id="pincode" name="pincode" required placeholder="110001" defaultValue={state?.pincode} className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">City</Label>
              <Input id="city" name="city" readOnly value={"Vijayapura"} placeholder="New Delhi" className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">State</Label>
              <Input id="state" readOnly name="state" value={"KARNATAKA"} placeholder="Vijayapura" className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Country</Label>
              <Input id="country" readOnly value={"INDIA"} name="country" placeholder="India" className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Category</Label>
              <Input id="category" name="category" required placeholder="Home" defaultValue={state?.category} className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isDefault" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Is Default</Label>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isDefault" name="isDefault" defaultChecked={state?.isDefault} className="rounded-2xl border-gray-100 bg-gray-50/50 py-5 focus:bg-white" />
                <Label htmlFor="isDefault">Yes</Label>
              </div>
            </div>
          </div>

          <Button isLoading={pending} disabled={pending} type="submit" className="w-full text-white">
            Save Address
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
