-- CreateTable
CREATE TABLE "mask" (
    "id" TEXT NOT NULL,
    "jobMaskId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "areaPercent" DECIMAL(65,30) NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mask" ADD CONSTRAINT "mask_jobMaskId_fkey" FOREIGN KEY ("jobMaskId") REFERENCES "job_mask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
