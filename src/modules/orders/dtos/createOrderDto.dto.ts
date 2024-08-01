export class createOrderDto {
  productsId: string[];
  productsPrices: number[];
  totalPrice: number;
  customerId: string;

  constructor(
    productsId: string[],
    productsPrices: number[],
    totalPrice: number,
    customerId: string
  ) {
    this.productsId = productsId;
    this.productsPrices = productsPrices;
    this.totalPrice = totalPrice;
    this.customerId = customerId;
  }
}
