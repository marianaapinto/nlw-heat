-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "github_id" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT
);
INSERT INTO "new_users" ("avatar_url", "github_id", "id", "login", "name") SELECT "avatar_url", "github_id", "id", "login", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
