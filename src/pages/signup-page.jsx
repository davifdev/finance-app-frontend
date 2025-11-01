import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";

const signupSchema = z
  .object({
    name: z.string().trim().nonempty("O nome é obrigatório."),
    lastname: z.string().trim().nonempty("O sobrenome é obrigatório."),
    email: z
      .string()
      .email("E-mail inválido")
      .trim()
      .nonempty("O e-mail é obrigatório."),
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
  const createdUser = useMutation({
    mutationKeyKey: ["createdUser"],
    mutationFn: async (data) => {
      const response = await api.post("/users", {
        first_name: data.name,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
  });

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const signup = (data) => {
    createdUser.mutate(data, {
      onSuccess: () => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshTokenToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Usuário criado com sucesso!");
      },
      onError: () => {
        console.log("Erro ao criar usuário");
      },
    });
  };

  console.log(createdUser.data);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signup)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Crie a sua conta</CardTitle>
              <CardDescription className="text-sm">
                Insira seus dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="terms"
                          {...field}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className={`text-xs ${form.formState.errors.terms ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          Ao clicar em “Criar conta”, você aceita{" "}
                          <a href="#" className="font-semibold underline">
                            nosso termo de uso e política de privacidade
                          </a>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

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
