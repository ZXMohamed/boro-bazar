"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePasswordSchema } from "../schemas/changePassword.schema";

interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordCard = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ChangePasswordFormValues) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password Change:", data);
      toast.success("Password Changed Successfully");
      form.reset();
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="border-t pt-2">
      <FieldGroup className="flex flex-col gap-5 pt-2">
        {/* Row 1: Old Password + New Password */}
        <div className="flex flex-col gap-5 sm:flex-row">
          <Controller
            name="oldPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor={field.name}>Old Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Old Password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="New Password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 2: Confirm Password (half width) */}
        <div className="flex">
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full sm:w-1/2"
              >
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="Confirm Password"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            disabled={isPending}
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full sm:w-1/2"
          >
            {isPending ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordCard;
