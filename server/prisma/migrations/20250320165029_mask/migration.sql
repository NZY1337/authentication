/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `job_mask` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "mask" DROP CONSTRAINT "mask_jobMaskId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "job_mask_jobId_key" ON "job_mask"("jobId");

-- AddForeignKey
ALTER TABLE "mask" ADD CONSTRAINT "mask_jobMaskId_fkey" FOREIGN KEY ("jobMaskId") REFERENCES "job_mask"("jobId") ON DELETE RESTRICT ON UPDATE CASCADE;
