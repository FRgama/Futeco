-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "crest" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "founded" INTEGER NOT NULL,
    "nationalTitles" INTEGER,
    "uefaRanking" INTEGER NOT NULL DEFAULT 999
);
INSERT INTO "new_Team" ("apiId", "country", "crest", "founded", "id", "name", "nationalTitles", "shortName", "uefaRanking") SELECT "apiId", "country", "crest", "founded", "id", "name", "nationalTitles", "shortName", coalesce("uefaRanking", 999) AS "uefaRanking" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_apiId_key" ON "Team"("apiId");
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
