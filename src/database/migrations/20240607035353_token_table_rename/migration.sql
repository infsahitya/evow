/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userID_fkey";

-- DropTable
DROP TABLE "tokens";

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "googleOAuthAccess" TEXT NOT NULL,
    "googleOAuthRefresh" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_id_key" ON "token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "token_access_key" ON "token"("access");

-- CreateIndex
CREATE UNIQUE INDEX "token_refresh_key" ON "token"("refresh");

-- CreateIndex
CREATE UNIQUE INDEX "token_googleOAuthAccess_key" ON "token"("googleOAuthAccess");

-- CreateIndex
CREATE UNIQUE INDEX "token_googleOAuthRefresh_key" ON "token"("googleOAuthRefresh");

-- CreateIndex
CREATE UNIQUE INDEX "token_userID_key" ON "token"("userID");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
