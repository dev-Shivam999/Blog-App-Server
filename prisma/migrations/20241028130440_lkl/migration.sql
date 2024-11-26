-- CreateTable
CREATE TABLE "Save" (
    "id" SERIAL NOT NULL,
    "blogId" TEXT NOT NULL,
    "blogerId" INTEGER NOT NULL,

    CONSTRAINT "Save_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD CONSTRAINT "Save_blogerId_fkey" FOREIGN KEY ("blogerId") REFERENCES "Bloger"("id") ON DELETE CASCADE ON UPDATE CASCADE;
