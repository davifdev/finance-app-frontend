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
  /**
   * Transações do usuário autenticado
   * @param {string} data.from - Data inicial (yyyy-MM-dd)
   * @param {string} data.to - Data final (yyyy-MM-dd)
   */
  getTransactions: async (data) => {
    const queryParams = new URLSearchParams();
    queryParams.set("from", data.from);
    queryParams.set("to", data.to);
    const response = await protectedApi.get(
      `/transactions/me?${queryParams.toString()}`
    );
    return response.data;
  },
  /**
   * Editar transação
   * @param {string} data.id - ID da transação
   * @param {string} data.name - Nome da transação
   * @param {string} data.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT)
   * @param {string} data.date - Data da transação (yyyy-MM-dd)
   * @param {string} data.amount - Valor da transação R$ 15.000,00
   */
  update: async (data) => {
    const response = await protectedApi.patch(`/transactions/me/${data.id}`, {
      name: data.name,
      date: data.date,
      amount: data.amount,
      type: data.type,
    });
    return response.data;
  },

  /**
   * Deletar transação
   * @param {string} data.id - ID da transação
   */
  delete: async (data) => {
    console.log(data);
    const response = await protectedApi.delete(`/transactions/me/${data.id}`);
    return response.data;
  },
};
