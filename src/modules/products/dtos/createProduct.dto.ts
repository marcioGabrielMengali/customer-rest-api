export class CreateProductDto {
  id?:string
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategoryId: number;

  constructor(
    productName: string,
    productDescription: string,
    productPrice: number,
    productCategoryId: number
  ) {
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productCategoryId = productCategoryId;
  }
}
