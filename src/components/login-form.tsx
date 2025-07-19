"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PasswordInput } from "./ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postAuth } from "@/lib/api/client/auth";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// todo :: use same schema on BE and FE, OR use TRPC
const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await postAuth(data);
      router.refresh();
      setErrorMessage(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
        return;
      }
      setErrorMessage("Something went wrong");
    }
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
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Tip: Use 'user1' for Type 1 user, 'user2' for Type 2</p>
      </div>
      {errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
    </form>
  );
};

export default LoginForm;
