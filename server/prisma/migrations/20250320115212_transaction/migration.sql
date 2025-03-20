/*
  Warnings:

  - A unique constraint covering the columns `[referenceId]` on the table `payment_transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_referenceId_key" ON "payment_transaction"("referenceId");
