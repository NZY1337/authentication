/*
  Warnings:

  - Added the required column `centre` to the `mask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mask" ADD COLUMN     "centre" JSONB NOT NULL;
