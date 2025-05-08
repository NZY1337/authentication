/*
  Warnings:

  - A unique constraint covering the columns `[jobMaskId]` on the table `mask` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mask_jobMaskId_key" ON "mask"("jobMaskId");
