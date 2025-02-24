/*
  Warnings:

  - You are about to drop the `avatar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "avatar" DROP CONSTRAINT "avatar_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT NOT NULL;

-- DropTable
DROP TABLE "avatar";
