import { api } from "./axios";

export async function authLogin({ username, password }) {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
}
export async function getCurrentUser(token) {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function registerUser({
  firstName,
  lastName,
  username,
  email,
  password,
}) {
  const response = await api.post("/users/add", {
    firstName,
    lastName,
    username,
    email,
    password,
  });

  return response.data;
}
