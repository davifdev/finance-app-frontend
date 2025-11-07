import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      queryClient.invalidateQueries(
        getTransactionQueryKey({ userId: user.id })
      );
    },
  });
};

export const getTransactionQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ["getBalance", userId];
  }

  return ["getBalance", from, to, userId];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionQueryKey({ usedId: user.id, from, to }),
    queryFn: async () => {
      const response = await TransactionService.getTransactions({ from, to });
      return response;
    },
    enabled: Boolean(from) && Boolean(to) && Boolean(user),
  });
};
