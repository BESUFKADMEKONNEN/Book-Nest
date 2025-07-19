"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

// interface Props<T extends FieldValues> {
//   schema: ZodTypeAny;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
//   type: "SIGN_IN" | "SIGN_UP";
// }

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ sucess: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  // const form: UseFormReturn<T> = useForm({
  //   resolver: zodResolver(schema),
  //   defaultValues: defaultValues as DefaultValues<T>,
  // });

  const form: UseFormReturn<T> = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // const form: UseFormReturn<T> = useForm({
  //     resolver: zodResolver(schema),
  //     defaultValues:defaultValues as DefaultValues<>
  //   });

  // });
  // const form : useFormReturn<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     username: "",
  //   },
  // });

  return <div></div>;
};

export default AuthForm;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   DefaultValues,
//   FieldValues,
//   Path,
//   SubmitHandler,
//   useForm,
//   UseFormReturn,
// } from "react-hook-form";
// import { ZodType } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
// // import FileUpload from "@/components/FileUpload";
// import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { ZodTypeAny } from "zod";

// interface Props<T extends FieldValues> {
//   schema: ZodTypeAny;
//   defaultValues: T;
//   onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
//   type: "SIGN_IN" | "SIGN_UP";
// }
// // interface Props<T extends FieldValues> {
// //   schema: ZodType<T>;
// //   defaultValues: T;
// //   onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
// //   type: "SIGN_IN" | "SIGN_UP";
// // }

// const AuthForm = <T extends FieldValues>({
//   type,
//   schema,
//   defaultValues,
//   onSubmit,
// }: Props<T>) => {

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   });

//   const handleSubmit: SubmitHandler<T> = async (data) => {};

//   return <div></div>;
// };

// export default AuthForm;
