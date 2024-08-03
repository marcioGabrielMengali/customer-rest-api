export class createOrderDto {
  productsId: string[];
  productsPrices: number[];
  totalPrice: number;
  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(
    productsId: string[],
    productsPrices: number[],
    totalPrice: number,
    customerId: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
  ) {
    this.productsId = productsId;
    this.productsPrices = productsPrices;
    this.totalPrice = totalPrice;
    this.customerId = customerId;
  }
}
