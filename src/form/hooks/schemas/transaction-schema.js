import z from "zod";

export const addTransactionButtonSchema = z.object({
  name: z
    .string("O nome da transação é obrigatório")
    .trim()
    .min(3, "O nome deve ter no mínimo 3 cacacteres"),
  amount: z.number({
    required_error: "O valor é obrigatório",
  }),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
});

export const editTransactionButtonSchema = addTransactionButtonSchema.extend({
  id: z.string().uuid(),
});
