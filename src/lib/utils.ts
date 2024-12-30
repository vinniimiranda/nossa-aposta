import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  // Adiciona timestamp no início para unicidade temporal
  const timestamp = Date.now().toString(36); // Base 36 para compactar o número
  result += timestamp;

  // Preenche o restante com caracteres aleatórios
  for (let i = 0; i < length - timestamp.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
