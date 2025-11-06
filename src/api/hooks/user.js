import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "@/contexts/auth";

import { UserService } from "../services/user";

export const getBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ["getBalance", userId];
  }

  return ["getBalance", from, to, userId];
};

export const useGetBalance = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: async () => {
      const response = await UserService.getBalance({ from, to });
      return response;
    },
  });
};
