"use client"
import { Input } from '@/components/ui/input';
import { RegisterFormType, registerSchema } from '../_schemas/register.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputError from '@/components/ui/inputError';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GoogleButton from '@/components/ui/googleButton';
import { Label } from '@/components/ui/label';
import { registerAPI } from '../_services/register';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerAPI(data);
      toast.success("Account created successfully!");
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col items-start gap-4 bg-white p-8"
    >
      <h1 className="self-center text-center text-xl font-bold leading-tight md:text-2xl">
        Join us today! Get special benefits and stay up-to-date.
      </h1>

      <div className="w-full flex flex-col items-center gap-4 mt-4">
        <GoogleButton />
        <div className="flex w-full items-center gap-2">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <span className="text-xs text-gray-500 whitespace-nowrap uppercase">Or, Sign Up with email</span>
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="w-full">
          <Label className="mb-2 block text-sm font-semibold">Name</Label>
          <Input
            type="text"
            placeholder="Enter your name"
            aria-invalid={!!errors.name}
            className="rounded-sm border-gray-300 px-3 py-6 transition-all"
            {...register("name")}
          />
          <InputError error={errors.name} />
        </div>

        <div className="w-full">
          <Label className="mb-2 block text-sm font-semibold">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            aria-invalid={!!errors.email}
            className="rounded-sm border-gray-300 px-3 py-6 transition-all"
            {...register("email")}
          />
          <InputError error={errors.email} />
        </div>

        <div className="w-full">
          <Label className="mb-2 block text-sm font-semibold">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            className="rounded-sm border-gray-300 px-3 py-6 transition-all"
            {...register("password")}
          />
          <InputError error={errors.password} />
        </div>
      </div>

      <div className="flex w-full items-center justify-between mt-2">
        <div className="flex items-center gap-2">
           <input type="checkbox" id="remember" className="accent-primary" />
           <label htmlFor="remember" className="text-xs text-gray-600">Remember Me</label>
        </div>
        <Link href="/forgot-password"  className="text-xs text-primary font-semibold hover:underline">
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex w-full items-center justify-center rounded-sm py-6 text-sm font-bold uppercase bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? <Spinner className="text-white" /> : "Sign Up"}
      </Button>

      <p className="mt-4 self-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}
