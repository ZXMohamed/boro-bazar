"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { profilSchema } from "../schemas/profile.schema";

interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
}

const MyProfileCard = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Profile Update:", data);
      toast.success("Profile Updated Successfully");
      form.reset();
    });
  }

  return (
    <div className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col gap-5">
          {/* Row 1: Full Name + Email */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Row 2: Phone (half width) */}
          <div className="mr-5 flex">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-full sm:max-w-1/2"
                >
                  <PhoneInput
                    country="eg"
                    value={field.value}
                    onChange={(phone) =>
                      field.onChange(phone ? `+${phone.replace("+", "")}` : "")
                    }
                    onBlur={field.onBlur}
                    containerClass={cn(
                      "focus-within:ring-ring focus-within:ring-1 rounded-md focus-within:outline-none",
                      fieldState.invalid &&
                        "border-destructive focus-within:ring-destructive",
                    )}
                    inputClass="w-full! py-1 h-9! shadow-xs! border! border-input! rounded-md! focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    buttonClass="shadow-xs! border! border-input! rounded-md!"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Row 3: Submit (half width) */}
          <div className="flex items-center justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-primary hover:bg-primary/90 w-fit"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default MyProfileCard;
