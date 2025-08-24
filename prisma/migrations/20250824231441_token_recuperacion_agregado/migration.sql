/*
  Warnings:

  - A unique constraint covering the columns `[tokenRecuperacion]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "tokenRecuperacion" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_tokenRecuperacion_key" ON "public"."Usuario"("tokenRecuperacion");
