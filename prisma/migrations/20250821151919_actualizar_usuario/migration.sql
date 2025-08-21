/*
  Warnings:

  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "correo" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
