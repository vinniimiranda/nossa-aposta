import { signInWithGoogleAction } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import Image from "next/image";

export default async function LoginForm() {
  return (
    <form className="gap- flex w-full flex-col">
      <SubmitButton
        formAction={signInWithGoogleAction}
        className="flex w-full items-center justify-center gap-2 hover:cursor-pointer"
        variant={"secondary"}
      >
        <Image
          width={20}
          height={20}
          src="/assets/google.png"
          alt="Google Logo"
        />
        Entrar com Google
      </SubmitButton>
    </form>
  );
}
