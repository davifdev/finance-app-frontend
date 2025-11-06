import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signinSchema } from "./schemas/signin-schema";

export const useSigninForm = () => {
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { form };
};
