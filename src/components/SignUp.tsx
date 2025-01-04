import { signUpAction } from "@/app/actions";

import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Signup() {
  return (
    <form className="flex min-w-64 flex-1 flex-col">
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          minLength={6}
          required
        />
        <SubmitButton formAction={signUpAction} pendingText="Cadastrando...">
          Cadastrar
        </SubmitButton>
      </div>
    </form>
  );
}
