/*
  Warnings:

  - Added the required column `ReciveFrom` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "ReciveFrom" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_ReciveFrom_fkey" FOREIGN KEY ("ReciveFrom") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;
