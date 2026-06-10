import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "@/contexts/auth";

import { TransactionService } from "../services/transaction";
import { getBalanceQueryKey } from "./user";

const addTransactionMutationKey = ["createdTransaction"];
const editTransactionMutationKey = ["editTransaction"];
const deleteTransactionMutationKey = ["deleteTransaction"];

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
    return ["getTransaction", userId];
  }
  return ["getTransaction", userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionQueryKey({ userId: user.id, from, to }),
    queryFn: async () => {
      const response = await TransactionService.getTransactions({ from, to });
      return response;
    },
    staleTime: 5 * 1000 * 60,
    enabled: Boolean(from) && Boolean(to) && Boolean(user),
  });
};

export const useEditTransaction = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: editTransactionMutationKey,
    mutationFn: async (data) => {
      const response = await TransactionService.update(data);
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

export const useDeleteTransaction = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: deleteTransactionMutationKey,
    mutationFn: async (data) => {
      const response = await TransactionService.delete(data);
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
