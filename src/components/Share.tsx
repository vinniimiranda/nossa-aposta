import { DialogTrigger } from "@radix-ui/react-dialog";
import { Copy, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

export default function Share() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Share2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Compartilhar bolão</DialogTitle>
        <p>Compartilhe seu bolão com seus amigos.</p>
        <div className="flex items-center justify-between gap-2">
          <Input readOnly value="https://bolao.com" />
          <Button>
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
