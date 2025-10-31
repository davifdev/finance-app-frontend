import { Link } from "react-router-dom";

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

const SignUp = () => {
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
