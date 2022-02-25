/*
  Warnings:

  - You are about to drop the column `readId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `toReadId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "readId",
DROP COLUMN "toReadId";
