/*
  Warnings:

  - You are about to drop the `tb_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_projects";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tb_tasks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tb_falecidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_falecimento" DATETIME NOT NULL,
    "data_sepultamento" DATETIME NOT NULL,
    "localizacao" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
