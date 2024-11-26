-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Start" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Pending" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Start_AB_unique" ON "_Start"("A", "B");

-- CreateIndex
CREATE INDEX "_Start_B_index" ON "_Start"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pending_AB_unique" ON "_Pending"("A", "B");

-- CreateIndex
CREATE INDEX "_Pending_B_index" ON "_Pending"("B");

-- AddForeignKey
ALTER TABLE "_Start" ADD CONSTRAINT "_Start_A_fkey" FOREIGN KEY ("A") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Start" ADD CONSTRAINT "_Start_B_fkey" FOREIGN KEY ("B") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pending" ADD CONSTRAINT "_Pending_A_fkey" FOREIGN KEY ("A") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pending" ADD CONSTRAINT "_Pending_B_fkey" FOREIGN KEY ("B") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
