/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuario_verificationToken_key" ON "public"."Usuario"("verificationToken");
