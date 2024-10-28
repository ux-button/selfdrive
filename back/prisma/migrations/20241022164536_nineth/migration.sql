/*
  Warnings:

  - A unique constraint covering the columns `[shareLink]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shareLink]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_shareLink_key" ON "File"("shareLink");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_shareLink_key" ON "Folder"("shareLink");
