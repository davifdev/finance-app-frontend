import { ChevronDown, LogOutIcon } from "lucide-react";

import { useAuthContext } from "@/contexts/auth";

import fintrackLogo from "../assets/images/fintrack-logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { user, signout } = useAuthContext();

  return (
    <Card className="rounded-none">
      <CardContent className="flex items-center justify-between px-8">
        <div className="flex h-[30px] w-[127px] items-center justify-center">
          <img src={fintrackLogo} alt="Logo Fintrack" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://gihub.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="text-xs">
                  {user?.name[0]}
                  {user?.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <span>
                {user?.name} {user?.lastname}
              </span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                size="small"
                className="flex w-full cursor-pointer justify-between"
                onClick={signout}
              >
                Sair
                <LogOutIcon />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default Header;
