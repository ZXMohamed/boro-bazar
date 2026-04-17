"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { ForgotFormType, forgotSchema } from "../_schemas/forgotpassword.schema";
import Image from "next/image";
import InputError from "@/components/ui/inputError";
import Link from "next/link";
import { useForgotPassword } from "../_hooks/useForgotPassword";
import { Spinner } from "@/components/ui/spinner";

const ForgotPasswordForm = () => {
    const { isPending } = useForgotPassword() 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotFormType>({
        resolver: zodResolver(forgotSchema),
    });
   
    const onSubmit = (data: ForgotFormType) => {
        console.log(data)
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Image src="/forgot-password.png" width={80} height={80} alt="icon" className="w-20 self-center" />
            <h2 className="mb-2 self-center text-xl font-bold text-slate-800">
                Forgot Password
            </h2>
            <p className="mb-7 self-center px-2 text-center text-sm leading-relaxed text-slate-500">
                Enter your registered email address and we'll send you a One-Time
                Password (OTP) to reset your password.
            </p>
            <Input
                type="email"
                className="mb-2 rounded-sm border border-gray-500 px-3 py-6"
                placeholder="Email id"
                {...register("email")}
            />
            <InputError error={errors.email} />
            {errors.root && <InputError error={errors.root} />}
            <Button
                type="submit"
                disabled={isPending}
                className="my-0! flex w-full items-center justify-center gap-1 rounded-sm py-6 uppercase disabled:opacity-70"
            >
                {isPending && <Spinner className="w-6 text-white" />}
                submit
            </Button>
            <Link
                href={"/login"}
                className="flex items-center gap-1.5 self-center text-sm text-slate-500 transition-colors duration-200 hover:text-emerald-500"
            >
                <FaArrowLeft />
                Back to login
            </Link>
        </form>
    );
};

export default ForgotPasswordForm;
