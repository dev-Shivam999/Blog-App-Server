/*
  Warnings:

  - You are about to drop the `_Pending` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Start` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Contant` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SendTo` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Pending" DROP CONSTRAINT "_Pending_A_fkey";

-- DropForeignKey
ALTER TABLE "_Pending" DROP CONSTRAINT "_Pending_B_fkey";

-- DropForeignKey
ALTER TABLE "_Start" DROP CONSTRAINT "_Start_A_fkey";

-- DropForeignKey
ALTER TABLE "_Start" DROP CONSTRAINT "_Start_B_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "Contant" TEXT NOT NULL,
ADD COLUMN     "SendTo" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_Pending";

-- DropTable
DROP TABLE "_Start";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_SendTo_fkey" FOREIGN KEY ("SendTo") REFERENCES "Bloger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
