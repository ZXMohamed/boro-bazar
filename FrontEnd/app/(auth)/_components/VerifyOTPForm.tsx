"use client"
import { OTPFormType, otpSchema } from "@/app/(auth)/_schemas/otp.schema";
import { verifyOtpAPI } from "@/app/(auth)/_services/verify-otp";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const VerifyOTPFormContent = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<OTPFormType>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setValue("otp", otpValue.join(""));
  }, [otpValue, setValue]);

  if (!mounted) return <div className="h-96 flex items-center justify-center"><Spinner /></div>;

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValue];
    newOtp[index] = value.slice(-1);
    setOtpValue(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmit = async (data: OTPFormType) => {
    try {
      await verifyOtpAPI({ email, otp: data.otp });
      toast.success("OTP Verified Successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 bg-white p-8"
    >
      <div className="relative size-24">
        <Image 
          src="/verifyOtp.png" 
          alt="Verify OTP" 
          fill 
          className="object-contain"
        />
      </div>

      <h2 className="text-xl font-bold text-black">Verify OTP</h2>
      <p className="text-center text-sm text-gray-500">
        OTP sent to <span className="font-bold text-primary">{email}</span>
      </p>

      <div className="flex gap-2">
        {otpValue.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "size-12 rounded-md border text-center text-xl font-bold transition-all focus:outline-none",
              otpValue.join("").length === 6 && index === 5 ? "border-primary" : "border-gray-300",
              "focus:border-primary focus:ring-4 focus:ring-primary/10"
            )}
          />
        ))}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || otpValue.join("").length < 6}
        className="w-full rounded-sm py-6 text-sm font-bold uppercase bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? <Spinner className="text-white" /> : "VERIFY OTP"}
      </Button>
    </form>
  );
};

export const VerifyOTPForm = () => {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
      <VerifyOTPFormContent />
    </Suspense>
  );
};
