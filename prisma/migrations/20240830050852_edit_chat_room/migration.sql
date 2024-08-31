/*
  Warnings:

  - You are about to drop the `_ChatRoomToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `create_userId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `join_userId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ChatRoomToUser_B_index";

-- DropIndex
DROP INDEX "_ChatRoomToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChatRoomToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "create_userId" INTEGER NOT NULL,
    "join_userId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ChatRoom_create_userId_fkey" FOREIGN KEY ("create_userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoom_join_userId_fkey" FOREIGN KEY ("join_userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoom_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
