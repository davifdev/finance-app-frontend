import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

import InputPassword from "@/components/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    name: z.string().trim().nonempty("O nome é obrigatório."),
    lastName: z.string().trim().nonempty("O sobrenome é obrigatório."),
    email: z.email().trim().nonempty("O e-mail é obrigatório."),
    password: z
      .string()
      .trim()
      .nonempty("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .trim()
      .nonempty("A confirmação de senha é obrigatória")
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você precisa aceitar os termos.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  console.log(form);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crie a sua conta</CardTitle>
          <CardDescription className="text-sm">
            Insira seus dados abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <InputPassword placeholder="Digite sua senha" />
          <InputPassword placeholder="Digite sua senha novamente" />
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-muted-foreground text-xs">
              Ao clicar em “Criar conta”, você aceita{" "}
              <a href="#" className="font-semibold underline">
                nosso termo de uso e política de privacidade
              </a>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
      <p className="text-muted-foreground text-sm">
        Já possui uma conta?{" "}
        <Button variant="link" className="p-1" asChild>
          <Link to="/signin">Faça login</Link>
        </Button>
      </p>
    </div>
  );
};

export default SignUp;
