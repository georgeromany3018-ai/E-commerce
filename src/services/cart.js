import { api } from "./axios";

export function fetchCartItem(id) {
  return `/products/${id}`;
}

export async function getCartItems(id) {
  const response = await api.get(fetchCartItem(id));
  return response.data;
}
//get all carts
export function getAllCartsEndPoint(limit = 8, skip = 0, sortBy, sortOpt = "desc") {
  let url = `/carts?limit=${limit}&skip=${skip}`;
  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${sortOpt}`;
  }
  return url;
}

export async function getAllCartsWithLimits(limit = 8, skip = 0, sortBy, sortOpt = "desc") {
  const response = await api.get(getAllCartsEndPoint(limit, skip, sortBy, sortOpt));
  return response.data;
}

export function getCartByIdEndPoint(id) {
  return `/carts/${id}`;
}

export async function getCartById(id) {
  const response = await api.get(getCartByIdEndPoint(id));
  return response.data;
}

export function deleteCartEndPoint(id) {
  return `/carts/${id}`;
}

export async function deleteCartApi(id) {
  const response = await api.delete(deleteCartEndPoint(id));
  return response.data;
}
