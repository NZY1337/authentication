/*
  Warnings:

  - You are about to drop the column `centre` on the `mask` table. All the data in the column will be lost.
  - Added the required column `center` to the `mask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mask" DROP COLUMN "centre",
ADD COLUMN     "center" JSONB NOT NULL;
