/*
  Warnings:

  - Added the required column `canalId` to the `Mensaje` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Canal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mensaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contenido" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "canalId" INTEGER NOT NULL,
    CONSTRAINT "Mensaje_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mensaje_canalId_fkey" FOREIGN KEY ("canalId") REFERENCES "Canal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mensaje" ("contenido", "createdAt", "id", "usuarioId") SELECT "contenido", "createdAt", "id", "usuarioId" FROM "Mensaje";
DROP TABLE "Mensaje";
ALTER TABLE "new_Mensaje" RENAME TO "Mensaje";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
