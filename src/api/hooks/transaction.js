import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/contexts/auth";

import { TransactionService } from "../services/transaction";
import { getBalanceQueryKey } from "./user";

const addTransactionMutationKey = ["createdTransaction"];

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: addTransactionMutationKey,
    mutationFn: async (data) => {
      const response = await TransactionService.create(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getBalanceQueryKey({ userId: user.id }));
    },
  });
};
