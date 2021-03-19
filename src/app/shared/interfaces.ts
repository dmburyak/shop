export interface FbResponse {
  name: string;
}

export interface Product {
  type: string,
  name: string,
  photo?: string,
  info?: string,
  price: string,
  id: string,
  date: Date
}
