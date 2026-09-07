/*
  Warnings:

  - Added the required column `apiId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "crest" TEXT NOT NULL
);
INSERT INTO "new_Team" ("crest", "id", "name", "shortName") SELECT "crest", "id", "name", "shortName" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_apiId_key" ON "Team"("apiId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
