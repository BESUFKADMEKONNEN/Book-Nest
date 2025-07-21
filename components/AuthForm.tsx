"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import Link from "next/link";
import { fi } from "zod/v4/locales";
import { FIELD_NAMES } from "@/constants";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { z, ZodType, ZodTypeAny } from "zod";

interface Props<T extends FieldValues> {
  schema: ZodTypeAny<any, any, any>;
  defaultValues: T;
  onSubmit: (
    data: T
  ) => Promise<{ success: boolean; error?: string; redirectTo?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

// interface Props<T extends FieldValues> {
//   schema: ZodType<T>;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<{ sucess: boolean; error?: string }>;
//   type: "SIGN_IN" | "SIGN_UP";
// }

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignin = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (!result.success && result?.redirectTo) {
      toast({
        title: `Error ${isSignin ? "signing in" : "signing up"}`,
        description:
          result.error ??
          (result.redirectTo === "/too-fast"
            ? "Too many attempts, Please try again later."
            : "Too many users, Please try again later."),
        variant: "destructive",
      });
      router.push(result.redirectTo);
      return;
    }

    if (result.success) {
      toast({
        title: "Success",
        description: isSignin
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignin ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignin ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignin
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      // <ImageUpload onFileChange={field.onChange} />
                      <ImageUpload
                        // onFileChange={field.onChange}
                        onFileChange={(filePath) => {
                          field.onChange(filePath); // update form value
                          return filePath; // if you want to return the string for other use cases
                        }}
                        value={field.value}
                        
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignin ? "Sign IN" : "Sign-Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignin ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignin ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
