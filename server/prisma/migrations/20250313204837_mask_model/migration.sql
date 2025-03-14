-- CreateTable
CREATE TABLE "mask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "maskUrl" TEXT NOT NULL,
    "maskCategory" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jobId" TEXT,
    "creditsConsumed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mask" ADD CONSTRAINT "mask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
