/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - Made the column `expiresAt` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "expiresAt" SET NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");
