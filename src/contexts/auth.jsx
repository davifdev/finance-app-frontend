import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage-keys";
import { protectedApi, publicApi } from "@/lib/axios";

const AuthContext = createContext({
  signin: () => {},
  signup: () => {},
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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const signupMutation = useMutation({
    mutationKeyKey: ["createdUser"],
    mutationFn: async (data) => {
      const response = await publicApi.post("/users", {
        first_name: data.name,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      return {
        id: response.data.id,
        email: response.data.email,
        name: response.data.first_name,
        lastname: response.data.last_name,
        tokens: response.data.tokens,
      };
    },
  });

  const signinMutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data) => {
      const response = await publicApi.post("/users/login", {
        email: data.email,
        password: data.password,
      });
      return {
        id: response.data.id,
        email: response.data.email,
        name: response.data.first_name,
        lastname: response.data.last_name,
        tokens: response.data.tokens,
      };
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
      console.log("Usuário criado com sucesso!");
    } catch (error) {
      console.log(error);
      console.log("Erro ao criar usuário");
    }
  };

  const signin = async (data) => {
    try {
      const loggedUser = await signinMutation.mutateAsync(data);
      const accessToken = loggedUser.tokens.accessToken;
      const refreshToken = loggedUser.tokens.refreshToken;
      setUser(loggedUser);
      setTokens({ accessToken, refreshToken });
      console.log("Login realizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const reAuth = async () => {
      try {
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken || !refreshToken) return;

        const response = await protectedApi("/users/me");
        setUser({
          id: response.data.id,
          name: response.data.first_name,
          email: response.data.email,
          lastname: response.data.last_name,
        });
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    reAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, signin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
