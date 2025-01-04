"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? (
        <>
          <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
