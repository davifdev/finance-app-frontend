import { protectedApi, publicApi } from "@/lib/axios";

export const UserService = {
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
