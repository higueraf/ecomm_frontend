export interface ProductInterface {
  productId?: string,
  code?: string,
  name?: string,
  description?: string,
  stock?: number,
  image?: File | null,
  price?: number,
  categoryId?: string,
  iva?: boolean,
}
