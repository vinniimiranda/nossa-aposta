import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary py-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          BolãoMaster
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
        <Button variant="secondary">Entrar</Button>
      </div>
    </header>
  );
}
