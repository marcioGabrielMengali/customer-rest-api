/*
  Warnings:

  - You are about to drop the `product_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_product_category_id_fkey";

-- DropTable
DROP TABLE "product_category";

-- CreateTable
CREATE TABLE "product_categorys" (
    "id" SERIAL NOT NULL,
    "product_category_name" TEXT NOT NULL,

    CONSTRAINT "product_categorys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
