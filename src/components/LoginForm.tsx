'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import type { Route } from 'next';
import { toast } from 'sonner';
import { signIn, signUp } from '@/lib/auth-client';
import { z as z4 } from 'zod/v4';

type Props = {
    mode?: 'sign-in' | 'sign-up';
};

const signInSchema = z4.object({
    email: z4.email().min(3).max(255),
    password: z4.string().min(8).max(100),
    redirect: z4.string().optional(),
});

const signUpSchema = z4.object({
    ...signInSchema.shape,
    firstName: z4.string().min(1).max(50),
    lastName: z4.string().min(1).max(50),
    phoneNumber: z4.string().min(1).max(15).optional(),
    image: z4.string().optional(),
});

export function LoginForm({ mode = 'sign-in' }: Readonly<Props>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, formAction, pending] = useActionState<any, FormData>(mode === 'sign-in' ? onSignIn : onSignUp, { error: null, success: false });

    const redirectUrl = searchParams.get("redirect") || "/";

     async function onSignIn (_prev: any, formData: FormData)  {
        try {
            const data = Object.fromEntries(formData.entries());
            const parsedData = signInSchema.safeParse(data);
            if (!parsedData.success) {
                return { error: parsedData.error.message };
            }
            await signIn.email(
                {
                    email: parsedData.data.email,
                    password: parsedData.data.password,
                    callbackURL: parsedData.data.redirect,
                },
                {
                    onSuccess: () => {
                        return router.push(redirectUrl as Route);
                    },
                    onError: (error: any) => {
                        toast.error(error.error.message);
                    },
                }
            );
        } catch (error) {
            console.error(error)
        }
    }

    async function onSignUp (_prev: any, formData: FormData) {
        try {
            const data = Object.fromEntries(formData.entries());
            const parsedData = signUpSchema.safeParse(data);
            if (!parsedData.success) {
                return { error: parsedData.error.message };
            }
            await signUp.email(
                {
                    email: parsedData.data.email,
                    password: parsedData.data.password,
                    name: `${parsedData.data.firstName} ${parsedData.data.lastName}`,
                    firstName: parsedData.data.firstName,
                    lastName: parsedData.data.lastName,
                    phoneNumber: parsedData.data.phoneNumber,
                    image: parsedData.data.image,
                    callbackURL: parsedData.data.redirect,
                },
                {
                    onSuccess: () => {
                        return router.push(redirectUrl as Route);
                    },
                    onError: (error) => {
                        toast.error(error.error.message);
                    },
                }
            );
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="p-2 md:p-4" action={formAction}>
            <input type="hidden" name="redirect" value={redirectUrl} />
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome</h1>
                    <p className="text-muted-foreground text-balance">
                        {mode === 'sign-in' ? 'Sign in to your account' : 'Create your account'}
                    </p>
                </div>

                {mode === 'sign-up' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                defaultValue={state?.firstName}
                                required
                                maxLength={50}
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                defaultValue={state?.lastName}
                                required
                                maxLength={50}
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                ) : null}

                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={state?.email}
                        required
                        maxLength={50}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
                        defaultValue={state?.password}
                        required
                        minLength={8}
                        maxLength={100}
                        placeholder="Enter your password"
                    />
                </div>
                {state?.error && <div className="text-red-500 text-sm">{state?.error}</div>}
                <Button type="submit" className="rounded-full px-4 py-2 font-semibold text-sm text-white" disabled={pending}>
                    {pending ? (
                        <>
                            <Loader2Icon />
                            Loading...
                        </>
                    ) : mode === 'sign-in' ? (
                        'Sign in'
                    ) : (
                        'Sign up'
                    )}
                </Button>
                {mode === 'sign-in' ? (
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <a target="_self" href={"/sign-up" as Route} className="underline underline-offset-4">
                            Sign up
                        </a>
                    </div>
                ) : (
                    <div className="text-center text-sm">
                        Already have an account?{' '}
                        <a target="_self" href={"/sign-in" as Route} className="underline underline-offset-4">
                            Sign in
                        </a>
                    </div>
                )}
            </div>
        </form>
    );
}
