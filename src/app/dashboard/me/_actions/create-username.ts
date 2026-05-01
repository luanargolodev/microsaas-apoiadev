"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createSlug } from "@/utils/create-slug";

const createUsernameSchema = z.object({
  username: z
    .string({ message: "O username é obrigatório" })
    .min(4, "O username precisa ter no mínimo 4 caracteres"),
});

type CreateUsernameFormData = z.infer<typeof createUsernameSchema>;

export async function createUsername(data: CreateUsernameFormData) {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "Usuário não autenticado",
      data: null,
    };
  }

  const schema = createUsernameSchema.safeParse(data);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
      data: null,
    };
  }

  try {
    const slug = createSlug(data.username);
    const userId = session.user.id;

    const existSlug = await prisma.user.findFirst({
      where: {
        username: slug,
      },
    });

    if (existSlug) {
      return {
        error: "Esse username já está em uso",
        data: null,
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: slug,
      },
    });

    return {
      data: slug,
      error: null,
    };
  } catch (error) {
    return {
      error: "Falha ao atualizar o username",
      data: null,
    };
  }
}
