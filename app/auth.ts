// app/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend({
      from: process.env.AUTH_FROM_EMAIL,
      // The RESEND_KEY is automatically picked up from the AUTH_RESEND_KEY env var
    }),
  ],
  pages: {
    signIn: '/login', // Redirect users to our custom login page
    verifyRequest: '/login/magic-link-sent', // Page to show after user enters email
  },
});