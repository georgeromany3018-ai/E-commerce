///////////////////////////////////////////////////
//////////get products
//////////////////////////////////////////////////
import { api } from "./axios";

export function getAllProductsEndPoint() {
  return "/products";
}

export async function getAllProducts() {
  const response = await api.get(getAllProductsEndPoint());
  return response.data;
}
///////////////////////////////////////////////////
//////////get products with skip & limit & filtretion
//////////////////////////////////////////////////
export function getAllProductswithlimitsEndPoint(
  category,
  limit,
  skip,
  sortBy,
  sortOpt,
) {
  const base = category ? `/products/category/${category}` : "/products";

  return `${base}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${sortOpt}`;
}

export async function getAllProductswithLimits(
  category,
  limit,
  skip,
  sortBy,
  sortOpt,
) {
  const response = await api.get(
    getAllProductswithlimitsEndPoint(category, limit, skip, sortBy, sortOpt),
  );
  return response.data;
}
///////////////////////////////////////////////////
//////////get searched products
//////////////////////////////////////////////////

export function getSearchedProductEndPoint(searchedProduct) {
  return `/products/search?q=${searchedProduct}`;
}

export async function getSearchedProduct(searchedProduct) {
  const response = await api.get(getSearchedProductEndPoint(searchedProduct));
  return response.data;
}
