import { PrismaClient } from "@prisma/client";
import { fakerEN } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { createCustomerDto } from "../src/modules/customers/dtos/createCustomer.dto";
import { createOrderDto } from "../src/modules/orders/dtos/createOrderDto.dto";
import { createProductCategoryDto } from "../src/modules/products/dtos/createProductCategoryDto.dto";
import { CreateProductDto } from "../src/modules/products/dtos/createProduct.dto";

const prisma = new PrismaClient();

async function main() {
  /**
   * Customers
   */
  const customers: createCustomerDto[] = [];
  const orders: createOrderDto[] = [];
  for (let i = 0; i < 1000; i++) {
    const firstName = fakerEN.person.firstName(i % 0 == 0 ? "male" : "female");
    const lastName = fakerEN.person.firstName(i % 0 == 0 ? "male" : "female");
    const customer: createCustomerDto = {
      id: randomUUID(),
      firstName,
      lastName,
      email: fakerEN.internet.email({ firstName, lastName }),
      phoneNumber: fakerEN.phone.number({ style: "international" }),
      birthDate: fakerEN.date.birthdate(),
      street: fakerEN.location.street(),
      number: Number(fakerEN.location.buildingNumber()),
      city: fakerEN.location.city(),
      state: fakerEN.location.state(),
      country: fakerEN.location.country(),
    };
    customers.push(customer);
  }
  console.log("Start seeding customers");
  await prisma.customer.createMany({
    data: customers,
    skipDuplicates: true,
  });

  /**
   * Product category
   */

  const categorys = ["Beverages", "Dishes", "Deserts"];
  const productsCategorys: createProductCategoryDto[] = [];
  categorys.forEach((category) => {
    const productCategory = {
      productCategoryName: category,
    };
    productsCategorys.push(productCategory);
  });

  console.log("Start seeding products categorys");
  await prisma.productCategory.createMany({
    data: productsCategorys,
    skipDuplicates: true,
  });

  /**
   * Product
   */

  const products: CreateProductDto[] = [];
  for (let i = 0; i < 20; i++) {
    const product: CreateProductDto = {
      id: randomUUID(),
      productName: fakerEN.food.dish(),
      productDescription: fakerEN.food.description(),
      productPrice: Number(fakerEN.commerce.price({ min: 20, max: 80 })),
      productCategoryId: Math.floor(Math.random() * 3) + 1,
    };
    products.push(product);
  }

  console.log("Start seeding products");
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  /**
   * Orders
   */

  customers.forEach((customer) => {
    const customerId = customer.id;

    for (let i = 0; i < 3; i++) {
      const randomNumberProjects = [];
      for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * products.length);
        randomNumberProjects.push(randomNumber);
      }
      const productsId = [
        products[randomNumberProjects[0]].id,
        products[randomNumberProjects[1]].id,
        products[randomNumberProjects[2]].id,
      ];
      const productsPrice = [
        products[randomNumberProjects[0]].productPrice,
        products[randomNumberProjects[1]].productPrice,
        products[randomNumberProjects[2]].productPrice,
      ];
      const order: createOrderDto = {
        productsId: productsId as string[],
        productsPrices: productsPrice as number[],
        totalPrice: productsPrice.reduce(
          (accumulator, currentvalue) => accumulator + currentvalue
        ),
        customerId: customerId as string,
      };
      orders.push(order);
    }
  });
  console.log("Start seeding orders");
  await prisma.order.createMany({
    data: orders,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    console.log("Finish Seeding");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log("Error On seeding");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
