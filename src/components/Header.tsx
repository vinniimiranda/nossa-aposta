import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Signup from "./SignUp";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-primary p-4 text-primary-foreground">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Nossa Aposta!
        </Link>

        {!user ? (
          <>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="#features" className="hover:underline">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:underline">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:underline">
                    Depoimentos
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Entrar</Button>
              </PopoverTrigger>
              <PopoverContent className="sm:max-w-[425px]">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Cadastro</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="signup">
                    <Signup />
                  </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <DropdownMenu dir="ltr" defaultOpen={false}>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href="/bets">Meus Bolões</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form action={signOutAction}>
                  <button>Sair</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
