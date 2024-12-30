import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LoginForm from "./LoginForm";
import Signup from "./SignUp";

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
    <header className="bg-primary py-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Nossa Aposta!
        </Link>
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
        {!user ? (
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
        ) : (
          <div className="flex items-center gap-4">
            Olá, {user.email}
            <form action={signOutAction}>
              <Button type="submit" variant={"secondary"}>
                Sair
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
