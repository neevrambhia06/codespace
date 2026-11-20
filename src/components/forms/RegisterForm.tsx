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
    <Card className="border-[#101010]/20 bg-[#EFE3D1] text-[#101010] shadow-sm">
      <CardHeader className="border-b border-[#101010]/10 pb-5">
        <CardTitle className="font-display text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-xs text-[#4A443C] font-light">
          Set up your profile to access your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="font-mono text-xs uppercase text-[#101010]">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ada Lovelace"
              autoComplete="name"
              className="border-[#101010]/20 bg-[#E6D5BD]/50 focus:border-[#D5360C] text-sm"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs font-mono text-[#B32608]">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="font-mono text-xs uppercase text-[#101010]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ada@example.dev"
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
              autoComplete="new-password"
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
            {isLoading ? "Creating account…" : "Complete Registration"}
          </Button>
        </form>
        <p className="mt-6 text-center text-xs text-[#101010]/70 font-mono">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#D5360C] underline underline-offset-4 hover:text-[#101010]"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
