import z from "zod";

export const signupSchema = z
  .object({
    name: z.string().trim().nonempty("O nome é obrigatório."),
    lastname: z.string().trim().nonempty("O sobrenome é obrigatório."),
    email: z
      .string()
      .email("E-mail inválido")
      .trim()
      .nonempty("O e-mail é obrigatório."),
    password: z
      .string()
      .trim()
      .nonempty("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .trim()
      .nonempty("A confirmação de senha é obrigatória")
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
    terms: z.boolean().refine((value) => value === true, {
      message: "Você precisa aceitar os termos.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });
