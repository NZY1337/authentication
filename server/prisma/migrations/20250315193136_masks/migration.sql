/*
  Warnings:

  - Made the column `jobId` on table `job_mask` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "job_mask" ALTER COLUMN "jobId" SET NOT NULL;
