"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PasswordInput } from "./ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isValidating, errors },
    watch,
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        username: z.string().min(1, { message: "Username is required" }),
        password: z
          .string()
          .min(1, { message: "Password is required" })
          .min(8, { message: "Password must be at least 8 characters" })
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
            message:
              "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
          }),
      })
    ),
  });

  console.log({ errors, value: watch() });

  const onSubmit = async (data: { username: string; password: string }) => {
    console.log("Submitting with", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Label required>Username</Label>
      <Controller
        name="username"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Label required>Password</Label>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <PasswordInput {...field} invalid={!!fieldState.error} />
            <p className="text-destructive text-sm">
              {fieldState.error?.message}
            </p>
          </>
        )}
      />
      <Button className="w-full" loading={isSubmitting} disabled={!isValid}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
