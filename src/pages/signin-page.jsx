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
import { Input } from "@/components/ui/input";

const SignIn = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Insira seus dados abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu e-mail" />
          <InputPassword placeholder="Digite sua senha" />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Entrar</Button>
        </CardFooter>
      </Card>
      <p className="text-muted-foreground text-sm">
        Ainda não possui uma conta?
        <Button variant="link" className="p-1" asChild>
          <Link to="/signup">Crie agora</Link>
        </Button>
      </p>
    </div>
  );
};

export default SignIn;
