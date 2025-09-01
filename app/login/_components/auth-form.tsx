'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// --- Zod Schemas for Validation ---
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

// --- Social Sign In Button Component ---
const SocialButton = ({ provider, children }: { provider: 'google' | 'github', children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant="outline"
      className="w-full"
      disabled={isPending}
      onClick={() => startTransition(() => signIn(provider, { callbackUrl: '/dashboard' }))}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  );
};

// --- Main Auth Form Component ---
export function AuthForm() {
  const [formType, setFormType] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isSignIn = formType === 'SIGN_IN';
  const schema = isSignIn ? signInSchema : signUpSchema;
  type FormValues = isSignIn extends true ? SignInValues : SignUpValues;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleCredentialsSubmit = (values: FormValues) => {
    startTransition(async () => {
      if (isSignIn) {
        const result = await signIn('credentials', {
          ...values,
          redirect: false,
        });
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Signed in successfully!");
          router.push('/dashboard');
        }
      } else {
        // Sign Up Logic
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Account created! Signing you in...");
          // Automatically sign in the user after successful registration
          await signIn('credentials', {
            email: (values as SignUpValues).email,
            password: (values as SignUpValues).password,
            callbackUrl: '/dashboard',
          });
        } else {
          toast.error(data.error || "Failed to create account.");
        }
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{isSignIn ? "Welcome Back!" : "Create an Account"}</CardTitle>
        <CardDescription>
          {isSignIn ? "Sign in to access your dashboard." : "Enter your details to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleCredentialsSubmit)} className="space-y-4">
          {!isSignIn && (
            <div>
              <Input placeholder="Your Name" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive mt-1">{(errors as any).name.message}</p>}
            </div>
          )}
          <div>
            <Input type="email" placeholder="name@example.com" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive mt-1">{(errors as any).email.message}</p>}
          </div>
          <div>
            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="text-sm text-destructive mt-1">{(errors as any).password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <SocialButton provider="google">Sign in with Google</SocialButton>
          <SocialButton provider="github">Sign in with GitHub</SocialButton>
        </div>

        <p className="mt-6 text-center text-sm">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Button variant="link" onClick={() => setFormType(isSignIn ? 'SIGN_UP' : 'SIGN_IN')}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}