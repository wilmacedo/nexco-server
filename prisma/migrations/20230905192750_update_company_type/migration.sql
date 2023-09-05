/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `company_types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_types_name_key" ON "company_types"("name");
