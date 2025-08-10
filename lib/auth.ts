import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, role: user.role } as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token?.role) (session as any).role = token.role;
      if (token?.sub) (session as any).userId = token.sub;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        const db = await prisma.user.findUnique({ where: { id: user.id } });
        token.role = db?.role || "CLINICIAN";
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/portal/clinician" },
  secret: process.env.NEXTAUTH_SECRET,
};