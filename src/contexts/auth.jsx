import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage-keys";
import { UserService } from "@/services/user";

const AuthContext = createContext({
  signin: () => {},
  signup: () => {},
  signout: () => {},
  user: null,
  isLoading: true,
});

const setTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
};

const getTokens = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data) => {
      const response = await UserService.signup(data);
      return response;
    },
  });

  const signinMutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      const response = UserService.signin(data);
      return response;
    },
  });

  const signup = async (data) => {
    try {
      setLoading(true);
      const createdUser = await signupMutation.mutateAsync(data);
      const accessToken = createdUser.tokens.accessToken;
      const refreshToken = createdUser.tokens.refreshToken;
      setUser(createdUser);
      setTokens({ accessToken, refreshToken });
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar usuário");
    }
  };

  const signin = async (data) => {
    try {
      const loggedUser = await signinMutation.mutateAsync(data);
      const accessToken = loggedUser.tokens.accessToken;
      const refreshToken = loggedUser.tokens.refreshToken;
      setUser(loggedUser);
      setTokens({ accessToken, refreshToken });
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao logar usuário");
    }
  };

  const signout = () => {
    setUser(null);
    removeTokens();
  };

  useEffect(() => {
    const reAuth = async () => {
      try {
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken || !refreshToken) return;

        const response = await UserService.me();
        setUser(response);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao reautenticar usuário");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    reAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, signin, isLoading, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
