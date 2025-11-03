import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

import { api } from "@/lib/axios";

const AuthContext = createContext({
  signin: () => {},
  signup: () => {},
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const signupMutation = useMutation({
    mutationKeyKey: ["createdUser"],
    mutationFn: async (data) => {
      const response = await api.post("/users", {
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
      const response = await api.post("/users/login", {
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
      const createdUser = await signupMutation.mutateAsync(data);
      const accessToken = createdUser.tokens.accessToken;
      const refreshToken = createdUser.tokens.refreshToken;
      setUser(createdUser);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
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
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("Login realizado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
