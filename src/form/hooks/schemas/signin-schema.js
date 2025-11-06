import z from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .trim()
    .nonempty("O e-mail é obrigatório"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});
