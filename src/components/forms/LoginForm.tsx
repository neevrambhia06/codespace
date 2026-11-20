"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { KeyRound, ShieldAlert } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Failed to login.");
      setIsLoading(false);
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/dashboard");
    router.refresh();
  };

  const fillDemoAccount = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password123");
  };

  return (
    <Card className="border-[#101010]/20 bg-[#EFE3D1] text-[#101010] shadow-sm">
      <CardHeader className="border-b border-[#101010]/10 pb-5">
        <CardTitle className="font-display text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-xs text-[#101010]/70 font-light">
          Authenticate to access your sovereign developer workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Quick Demo Fill Buttons */}
        <div className="mb-6 rounded-xs border border-[#101010]/15 bg-[#E6D5BD]/60 p-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-[#D5360C] font-bold mb-2">
            <KeyRound className="w-3 h-3" />
            <span>QUICK-FILL SEEDED CREDENTIALS</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount("admin@codespace.dev")}
              className="text-left p-2 rounded-xs border border-[#101010]/10 bg-[#EFE3D1] hover:bg-[#101010] hover:text-[#E6D5BD] transition-all font-mono text-[10px]"
            >
              <span className="block font-bold">ADMIN ROLE</span>
              <span className="opacity-70">admin@codespace.dev</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount("guest@codespace.dev")}
              className="text-left p-2 rounded-xs border border-[#101010]/10 bg-[#EFE3D1] hover:bg-[#101010] hover:text-[#E6D5BD] transition-all font-mono text-[10px]"
            >
              <span className="block font-bold">GUEST ROLE</span>
              <span className="opacity-70">guest@codespace.dev</span>
            </button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-mono text-xs uppercase text-[#101010]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@codespace.dev"
              autoComplete="email"
              className="border-[#101010]/20 bg-[#E6D5BD]/50 focus:border-[#D5360C] text-sm"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs font-mono text-[#B32608]">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-mono text-xs uppercase text-[#101010]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="border-[#101010]/20 bg-[#E6D5BD]/50 focus:border-[#D5360C] text-sm"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs font-mono text-[#B32608]">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" loading={isLoading} className="w-full mt-2">
            {isLoading ? "Authenticating…" : "Enter Workspace"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-[#101010]/70 font-mono">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-[#D5360C] underline underline-offset-4 hover:text-[#101010]"
          >
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
