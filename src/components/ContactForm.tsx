'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, SendIcon } from '@/components/icons';
import { createContact } from '@/actions';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(createContact, null)

  if (state?.success) {
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-4 animate-zoom-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <SendIcon className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black tracking-tight">Thank You!</h2>
        <p className="text-gray-500 max-w-sm">
          Your message has been sent successfully. Our team will get back to you shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="rounded-full px-8 py-4 font-bold border-2"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 animate-slide-up">
      <form action={formAction} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1 italic tracking-widest uppercase opacity-60">Full Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="John Doe"
              className="rounded-2xl border-gray-100 bg-gray-50/50 py-6 px-6 focus:bg-white focus:shadow-xl transition-all"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1 italic tracking-widest uppercase opacity-60">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="rounded-2xl border-gray-100 bg-gray-50/50 py-6 px-6 focus:bg-white focus:shadow-xl transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1 italic tracking-widest uppercase opacity-60">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="1234567890"
            className="rounded-2xl border-gray-100 bg-gray-50/50 py-6 px-6 focus:bg-white focus:shadow-xl transition-all"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="message" className="text-sm font-bold text-gray-700 ml-1 italic tracking-widest uppercase opacity-60">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell us about your requirements..."
            className="min-h-[150px] rounded-2xl border-gray-100 bg-gray-50/50 py-6 px-6 focus:bg-white focus:shadow-xl transition-all resize-none shadow-none focus-visible:ring-0"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-8 text-lg font-black shadow-xl shadow-primary/20 transition-all active:scale-95 group overflow-hidden relative"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send Message
              <SendIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
