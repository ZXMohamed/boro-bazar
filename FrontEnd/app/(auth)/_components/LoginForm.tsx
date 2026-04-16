"use client"
import { Input } from '@/components/ui/input';
import { LogInFormType, logInSchema } from '../_schemas/login.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputError from '@/components/ui/inputError';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GoogleButton from '@/components/ui/googleButton';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormType>({
    resolver: zodResolver(logInSchema),
  });
  
  const inputs: {
    type: string;
    placeholder: string;
    name: keyof LogInFormType;
  }[] = [
      { type: "email", placeholder: "Email id", name: "email" },
      { type: "password", placeholder: "Password", name: "password" },
    ];

  const onSubmit = (data: LogInFormType) => {
    console.log(data)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col items-start gap-3 bg-white p-8"
      >
        <h2 className="self-center text-xl font-bold">Login to your account</h2>
        {inputs.map((input) => (
          <div key={input.name} className="w-full">
            <Input
              type={input.type}
              placeholder={input.placeholder}
              className="rounded-sm border border-gray-500 px-3 py-6"
              {...register(input.name)}
            />
            <InputError error={errors[input.name]} />
          </div>
        ))}
        <Link
          href={"/forgot-password"}
          className="my-0! w-auto! bg-[none] p-0 text-black capitalize shadow-none hover:bg-transparent"
        >
          forget password?
        </Link>

        <Button
          type="submit"
          className="my-0! flex w-full items-center justify-center gap-1 rounded-sm py-6 uppercase disabled:opacity-70"
        >
          login
        </Button>

        <p className="self-center text-gray-600 capitalize">
          not registered?{" "}
          <Link href={"register"} className="text-primary capitalize">
            sign up
          </Link>
        </p>

        <p className="self-center text-gray-800 capitalize">
          or continue with google account
        </p>
        <GoogleButton />
      </form>
    </>
  )
}
