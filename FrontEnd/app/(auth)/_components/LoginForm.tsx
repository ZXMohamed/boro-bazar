"use client"
import { Input } from '@/components/ui/input';
import { LogInFormType, logInSchema } from '../_schemas/login.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputError from '@/components/ui/inputError';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { loginAPI } from '../_services/login';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import GoogleButton from '@/components/ui/googleButton';

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormType>({
    resolver: zodResolver(logInSchema),
  });
  
  const inputs: {
    type: string;
    placeholder: string;
    name: keyof LogInFormType;
  }[] = [
      { type: "text", placeholder: "Name", name: "name" },
      { type: "email", placeholder: "Email id", name: "email" },
      { type: "password", placeholder: "Password", name: "password" },
    ];

  const onSubmit = async (data: LogInFormType) => {
    try {
      const response = await loginAPI({
        ...data,
        email: data.email.trim().toLowerCase(),
      });
      if (response.success) {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col items-start gap-4 bg-white p-8"
    >
      <h2 className="self-center text-xl font-bold text-black capitalize mb-4">Login to your account</h2>
      
      {inputs.map((input) => (
        <div key={input.name} className="w-full">
          <Input
            type={input.type}
            placeholder={input.placeholder}
            aria-invalid={!!errors[input.name]}
            className="rounded-sm border-gray-400 px-3 py-6 transition-all"
            {...register(input.name)}
          />
          <InputError error={errors[input.name]} />
        </div>
      ))}

      <Link
        href="/forgot-password"
        className="text-black text-sm capitalize hover:underline"
      >
        forget password?
      </Link>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm py-6 uppercase bg-primary hover:bg-primary/90 font-bold"
      >
        {isSubmitting ? <Spinner className="text-white" /> : "login"}
      </Button>

      <p className="self-center text-sm text-gray-600 capitalize">
        not registered?{" "}
        <Link href="register" className="text-primary font-bold hover:underline">
          sign up
        </Link>
      </p>

      <div className="w-full flex flex-col items-center gap-4 mt-2">
        <p className="text-xs text-gray-400 uppercase">or continue with</p>
        <GoogleButton />
      </div>
    </form>
  )
}
