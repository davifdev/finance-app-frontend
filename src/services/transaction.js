import { protectedApi } from "@/lib/axios";

export const TransactionService = {
  /**
   * Dados da transação
   * @param {string} data.name - Nome da transação
   * @param {string} data.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT)
   * @param {string} data.date - Data da transação (yyyy-MM-dd)
   * @param {string} data.amount - Valor da transação R$ 15.000,00
   */
  create: async (data) => {
    const response = await protectedApi.post("/transactions/me", {
      name: data.name,
      type: data.type,
      date: data.date,
      amount: data.amount,
    });
    return response.data;
  },
};
