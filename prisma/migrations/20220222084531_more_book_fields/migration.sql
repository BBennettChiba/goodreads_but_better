/*
  Warnings:

  - You are about to drop the column `name` on the `book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ISBN]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,firstAuthor]` on the table `book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstAuthor` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `book` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ISBN` on the `book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "firstAuthor" TEXT NOT NULL,
ADD COLUMN     "published" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "ISBN",
ADD COLUMN     "ISBN" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "book_ISBN_key" ON "book"("ISBN");

-- CreateIndex
CREATE UNIQUE INDEX "book_title_firstAuthor_key" ON "book"("title", "firstAuthor");
