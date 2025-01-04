import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function LoginForm() {
  return (
    <form className="flex min-w-64 flex-1 flex-col">
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Input type="password" name="password" placeholder="Senha" required />
        <SubmitButton pendingText="Entrando..." formAction={signInAction}>
          Entrar
        </SubmitButton>
      </div>
    </form>
  );
}
