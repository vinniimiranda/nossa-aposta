import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LoginForm from "./LoginForm";

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
    <header className="bg-primary bg-header bg-cover bg-repeat-space p-4 text-primary-foreground bg-blend-soft-light">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Vamo Ganhar!
        </Link>

        {!user ? (
          <>
            <nav>
              <ul className="flex flex-col md:flex-row md:gap-2">
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
              <PopoverContent className="w-[200px] sm:max-w-[425px]">
                <LoginForm />
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <DropdownMenu dir="ltr" defaultOpen={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:cursor-pointer">
                <AvatarImage
                  src={
                    user.user_metadata.picture ??
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Link href="/pools">Meus Bolões</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer">
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
