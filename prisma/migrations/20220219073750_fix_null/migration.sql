/*
  Warnings:

  - You are about to drop the column `reviewId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_bookId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "bookId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "readId" DROP NOT NULL,
ALTER COLUMN "reviewId" DROP NOT NULL,
ALTER COLUMN "toReadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
