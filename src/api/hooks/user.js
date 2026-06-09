import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuthContext } from "@/contexts/auth";

import { UserService } from "../services/user";

const signinMutationKey = ["signin"];
const signupMutationKey = ["signup"];
export const getBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ["getBalance", userId];
  }

  return ["getBalance", userId, from, to];
};

export const useGetBalance = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: async () => {
      const response = UserService.getBalance({ from, to });
      return response;
    },
    staleTime: 5 * 1000 * 60,
    enabled: Boolean(from) && Boolean(to) && Boolean(user),
  });
};

export const useSignin = () => {
  return useMutation({
    mutationKey: signinMutationKey,
    mutationFn: async (data) => {
      const response = UserService.signin(data);
      return response;
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (data) => {
      const response = UserService.signup(data);
      return response;
    },
  });
};
