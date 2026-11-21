import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://codespace-five.vercel.app",
    process.env.BETTER_AUTH_URL || "",
    process.env.NEXT_PUBLIC_APP_URL || "",
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "GUEST",
        // Role is assigned at sign-up time / by an admin, never by client input.
        input: false,
      },
    },
  },
});

export type UserRole = "GUEST" | "MEMBER" | "ADMIN";

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as { role?: UserRole }).role ?? "GUEST",
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
}
