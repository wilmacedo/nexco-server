/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `interests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "interests_name_key" ON "interests"("name");
