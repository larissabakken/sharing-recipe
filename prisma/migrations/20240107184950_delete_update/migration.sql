/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `favorites_recipes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "servings" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_recipes" ("createdAt", "id", "ingredients", "instructions", "servings", "title", "userId") SELECT "createdAt", "id", "ingredients", "instructions", "servings", "title", "userId" FROM "recipes";
DROP TABLE "recipes";
ALTER TABLE "new_recipes" RENAME TO "recipes";
CREATE TABLE "new_favorites_recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "favorites_recipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "favorites_recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_favorites_recipes" ("createdAt", "id", "recipeId", "userId") SELECT "createdAt", "id", "recipeId", "userId" FROM "favorites_recipes";
DROP TABLE "favorites_recipes";
ALTER TABLE "new_favorites_recipes" RENAME TO "favorites_recipes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
