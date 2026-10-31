/////get all categories

import { api } from "./axios";

export function getAllCategoriesEndPoint() {
  return "products/categories";
}

export async function getAllCategories() {
  const response = await api.get(getAllCategoriesEndPoint());
  return response.data;
}
