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
import { KeyRound } from "lucide-react";

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
    <Card className="border-[#101010]/12 bg-white text-[#101010] shadow-sm rounded-xl">
      <CardHeader className="border-b border-[#101010]/10 pb-5">
        <CardTitle className="font-sans text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-xs text-[#524D46] font-normal">
          Sign in to access your projects, tasks, and notes.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Quick Demo Fill Buttons */}
        <div className="mb-6 rounded-lg border border-[#101010]/10 bg-[#EDE4D5]/35 p-3.5">
          <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-[#D5360C] mb-2.5">
            <KeyRound className="w-3.5 h-3.5" />
            <span>One-Click Demo Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount("admin@codespace.dev")}
              className="text-left p-2.5 rounded-lg border border-[#101010]/10 bg-white hover:bg-[#EDE4D5] transition-all font-sans text-xs cursor-pointer"
            >
              <span className="block font-semibold text-[#101010]">Alex Morgan</span>
              <span className="text-[#524D46] text-[11px]">admin@codespace.dev</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount("guest@codespace.dev")}
              className="text-left p-2.5 rounded-lg border border-[#101010]/10 bg-white hover:bg-[#EDE4D5] transition-all font-sans text-xs cursor-pointer"
            >
              <span className="block font-semibold text-[#101010]">Jordan Lee</span>
              <span className="text-[#524D46] text-[11px]">guest@codespace.dev</span>
            </button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-sans text-xs font-semibold text-[#101010]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@codespace.dev"
              autoComplete="email"
              className="text-sm"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs font-sans text-[#B32608]">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="font-sans text-xs font-semibold text-[#101010]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="text-sm"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs font-sans text-[#B32608]">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" loading={isLoading} className="w-full mt-2">
            {isLoading ? "Signing in…" : "Enter Workspace"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-[#524D46] font-sans">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#D5360C] underline underline-offset-4 hover:text-[#101010]"
          >
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
