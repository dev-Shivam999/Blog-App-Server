/*
  Warnings:

  - You are about to drop the column `content` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "ChatDetails" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sendTo" TEXT NOT NULL,
    "GetTo" TEXT NOT NULL,
    "ChatId" TEXT NOT NULL,

    CONSTRAINT "ChatDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatDetails" ADD CONSTRAINT "ChatDetails_ChatId_fkey" FOREIGN KEY ("ChatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
