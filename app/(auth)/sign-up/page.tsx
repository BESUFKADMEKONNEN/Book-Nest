import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation/AuthValidation";
import React from "react";

export default function page() {
  
  const signUpF = async (params: AuthCredentials) => { }

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        password: "",
        universityId:0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  );
}
