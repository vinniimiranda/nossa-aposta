"use server";

import { generateUniqueId } from "@/lib/utils";
import { db } from "@/server/db";
import { pools } from "@/server/db/schema";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type Pool } from "../types";

export const getPoolsAction = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pools = await db.query.pools.findMany({
    where: (pools, { eq }) => eq(pools.owner, session?.user.email!),
    with: {
      bets: true,
    },
  });

  return pools;
};

export const getPoolByIdAction = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pool = await db.query.pools.findFirst({
    where: (pools, { eq }) => eq(pools.identifier, id),
    with: {
      bets: true,
    },
  });

  const isOwner = pool?.owner === session?.user.email;
  return Object.assign({ ...pool }, { isOwner }) as unknown as Pool;
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const getLotteryAction = async () => {
  return [
    {
      name: "Mega Sena",
      value: "MEGA_SENA",
      icon: "/assets/mega_sena.svg",
      rules: {
        minHits: [4, 5, 6],
        numbersPlayable: { min: 6, max: 15 },
        numbersAvailable: 60,
      },
    },
    {
      name: "Quina",
      value: "QUINA",
      icon: "/assets/quina.svg",
      rules: {
        minHits: [2, 3, 4, 5],
        numbersPlayable: { min: 5, max: 15 },
        numbersAvailable: 80,
      },
    },
    {
      name: "Loteca",
      value: "LOTECA",
      icon: "/assets/loteca.svg",
      rules: {
        minHits: [13, 14],
        numbersPlayable: { min: 14, max: 14 },
        numbersAvailable: 42, // Considerando 3 opções por jogo em 14 jogos
      },
    },
    {
      name: "Lotofácil",
      value: "LOTOFACIL",
      icon: "/assets/lotofacil.svg",
      rules: {
        minHits: [11, 12, 13, 14, 15],
        numbersPlayable: { min: 15, max: 20 },
        numbersAvailable: 25,
      },
    },
    {
      name: "Lotomania",
      value: "LOTOMANIA",
      icon: "/assets/lotomania.svg",
      rules: {
        minHits: [0, 15, 16, 17, 18, 19, 20],
        numbersPlayable: { min: 50, max: 50 },
        numbersAvailable: 100,
      },
    },
    {
      name: "Mais Milionaria",
      value: "MAIS",
      icon: "/assets/mais.svg",
      rules: {
        minHits: [4],
        numbersPlayable: { min: 6, max: 6 },
        numbersAvailable: 50, // para os números principais
        additionalNumbers: { min: 2, max: 2, total: 6 }, // para os trevos
      },
    },
    {
      name: "Dupla Sena",
      value: "DUPLA_SENA",
      icon: "/assets/dupla_sena.svg",
      rules: {
        minHits: [3, 4, 5, 6],
        numbersPlayable: { min: 6, max: 15 },
        numbersAvailable: 50,
      },
    },
  ];
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const createPool = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const lottery = formData.get("lottery")?.toString();
  const drawDate = formData.get("drawDate")?.toString();
  const supabase = await createClient();
  const identifier = generateUniqueId(8);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pool = await db
    .insert(pools)
    .values({
      identifier: identifier,
      name: name!,
      lottery: lottery!,
      drawDate: new Date(drawDate!),
      owner: session?.user.email!,
    })
    .returning();

  return redirect("/bets/" + identifier);
};
