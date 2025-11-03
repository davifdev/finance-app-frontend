import { protectedApi, publicApi } from "@/lib/axios";

export const UserService = {
  /**
   * Criação de um novo Usuário
   * @param {string} data.name - Nome do usuário
   * @param {string} data.lastname - Sobrenome do usuário
   * @param {string} data.email - E-mail do usuário
   * @param {stirng} data.password - Senha do usuário
   * @param {string} data.confirmPassword - Confirmação de Senha
   * @return {Object} Usuário criado
   * @return {string} data.tokens - Tokens de autenticação
   */
  signup: async (data) => {
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
  /**
   * Criação de um novo Usuário
   * @param {string} data.email - E-mail do usuário
   * @param {stirng} data.password - Senha do usuário
   * @return {Object} Usuário Logado
   * @return {string} data.tokens - Tokens de autenticação
   */
  signin: async (data) => {
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
  /**
   * Retorna usuário autenticado
   * @return {Object} Usuário autenticado
   */
  me: async () => {
    const response = await protectedApi("/users/me");
    return {
      id: response.data.id,
      name: response.data.first_name,
      email: response.data.email,
      lastname: response.data.last_name,
    };
  },
};
