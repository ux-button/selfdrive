/*
  Warnings:

  - You are about to drop the column `shareLink` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `shareLink` on the `Folder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shareId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shareId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_shareLink_key";

-- DropIndex
DROP INDEX "Folder_shareLink_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "shareLink",
ADD COLUMN     "shareId" TEXT;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "shareLink",
ADD COLUMN     "shareId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "File_shareId_key" ON "File"("shareId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_shareId_key" ON "Folder"("shareId");
