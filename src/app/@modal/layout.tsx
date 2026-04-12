'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';

const AUTH_PATHS = new Set(['/sign-in', '/sign-up']);

export default function ModalLayout({ children }: Readonly<IProps>) {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Dialog defaultOpen onOpenChange={router.back}>
            <DialogContent aria-describedby="Authentication" className={cn('w-full max-h-[98svh] overflow-y-auto', !AUTH_PATHS.has(pathname) ? 'sm:max-w-3xl' : '')}>
                <DialogHeader>
                    <DialogTitle className="hidden">Auth</DialogTitle>
                </DialogHeader>
                <Suspense>{children}</Suspense>
            </DialogContent>
        </Dialog>
    );
}
