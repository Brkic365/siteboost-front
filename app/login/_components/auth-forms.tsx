// app/login/_components/auth-forms.tsx
'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';

// --- Google Sign In Button ---
export function GoogleSignInButton() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(() => {
      signIn('google', { callbackUrl: '/dashboard' });
    });
  };

  return (
    <Button 
      onClick={handleSignIn} 
      className="w-full"
      disabled={isPending}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
      <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 58.2L376.6 128H298c-44.3 0-82.8 28-97.5 68.6-5.8 15.6-9.5 32.6-9.5 50.4s3.7 34.8 9.5 50.4c14.7 40.6 53.2 68.6 97.5 68.6h188.2zM97.2 352.9c-1.2 1-1.2 2.3 0 3.3L120 376c1.2 1 2.8 1 4 0l24-24c1.2-1.2 1.2-2.8 0-4L97.2 352.9zm353.4-129.4l-31.8-31.8c-1.2-1.2-2.8-1.2-4 0l-24 24c-1.2 1.2-1.2 2.8 0 4l31.8 31.8c1.2 1.2 2.8 1.2 4 0l24-24c1.2-1.2 1.2-2.8 0-4z"></path>
      </svg>
      }
      Sign in with Google
    </Button>
  );
}

// --- Email "Magic Link" Sign In Form ---
const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});
type EmailFormValues = z.infer<typeof emailSchema>;

export function EmailSignInForm() {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: EmailFormValues) => {
    startTransition(async () => {
      const result = await signIn('resend', {
        email: data.email,
        redirect: false, // We handle redirection manually or let the verifyRequest page show
      });

      if (result?.error) {
        toast.error('Sign-in failed. Please try again.');
      }
      // If successful, NextAuth will redirect to the `verifyRequest` page we configured
    });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Input 
          id="email" 
          type="email" 
          placeholder="name@example.com" 
          {...register('email')}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Magic Link
      </Button>
    </form>
  );
}