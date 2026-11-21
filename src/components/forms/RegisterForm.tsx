"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { registerSchema, type RegisterValues } from "@/lib/validations";
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

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Failed to register.");
      setIsLoading(false);
      return;
    }

    toast.success("Registered successfully! Welcome to CodeSpace.");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Card className="border-[#101010]/12 bg-white text-[#101010] shadow-sm rounded-xl">
      <CardHeader className="border-b border-[#101010]/10 pb-5">
        <CardTitle className="font-sans text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-xs text-[#524D46] font-normal">
          Set up your profile to access your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="font-sans text-xs font-semibold text-[#101010]">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Alex Morgan"
              autoComplete="name"
              className="text-sm"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs font-sans text-[#B32608]">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-sans text-xs font-semibold text-[#101010]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="alex@codespace.dev"
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
              autoComplete="new-password"
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
            {isLoading ? "Creating account…" : "Complete Registration"}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-[#524D46] font-sans">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#D5360C] underline underline-offset-4 hover:text-[#101010]"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
