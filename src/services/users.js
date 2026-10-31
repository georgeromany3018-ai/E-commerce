import { api } from "./axios";

export function getAllUsersEndPoint(limit = 8, skip = 0, sortBy = "firstName", sortOpt = "asc") {
  let url = `/users?limit=${limit}&skip=${skip}`;
  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${sortOpt}`;
  }
  return url;
}

export async function getAllUsersWithLimits(limit = 8, skip = 0, sortBy = "firstName", sortOpt = "asc") {
  const response = await api.get(getAllUsersEndPoint(limit, skip, sortBy, sortOpt));
  return response.data;
}

export function getSearchedUsersEndPoint(query, limit = 8, skip = 0) {
  return `/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
}

export async function getSearchedUsers(query, limit = 8, skip = 0) {
  const response = await api.get(getSearchedUsersEndPoint(query, limit, skip));
  return response.data;
}

export function getFilteredUsersByRoleEndPoint(role, limit = 8, skip = 0) {
  return `/users/filter?key=role&value=${encodeURIComponent(role)}&limit=${limit}&skip=${skip}`;
}

export async function getFilteredUsersByRole(role, limit = 8, skip = 0) {
  const response = await api.get(getFilteredUsersByRoleEndPoint(role, limit, skip));
  return response.data;
}

export function getUserByIdEndPoint(id) {
  return `/users/${id}`;
}

export async function getUserById(id) {
  const response = await api.get(getUserByIdEndPoint(id));
  return response.data;
}

export function deleteUserEndPoint(id) {
  return `/users/${id}`;
}

export async function deleteUserApi(id) {
  const response = await api.delete(deleteUserEndPoint(id));
  return response.data;
}
