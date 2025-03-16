/*
  Warnings:

  - You are about to drop the `mask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mask" DROP CONSTRAINT "mask_userId_fkey";

-- DropTable
DROP TABLE "mask";

-- CreateTable
CREATE TABLE "job_mask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "maskUrl" TEXT NOT NULL,
    "maskCategory" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jobId" TEXT,
    "creditsConsumed" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_mask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_mask" ADD CONSTRAINT "job_mask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
