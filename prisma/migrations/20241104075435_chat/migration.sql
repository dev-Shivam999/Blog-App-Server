/*
  Warnings:

  - You are about to drop the column `Contant` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `content` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_SendTo_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "Contant",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "messageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "Room" INTEGER NOT NULL,
    "ChatId" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_Room_fkey" FOREIGN KEY ("Room") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_SendTo_fkey" FOREIGN KEY ("SendTo") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
