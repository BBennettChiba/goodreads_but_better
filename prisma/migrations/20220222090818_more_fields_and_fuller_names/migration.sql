/*
  Warnings:

  - A unique constraint covering the columns `[firstName,otherNames,lastName]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publisher` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_firstName_lastName_key";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "otherNames" TEXT;

-- AlterTable
ALTER TABLE "book" ADD COLUMN     "publisher" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_firstName_otherNames_lastName_key" ON "Author"("firstName", "otherNames", "lastName");
