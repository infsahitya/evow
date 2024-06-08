-- AlterTable
ALTER TABLE "token" ALTER COLUMN "googleOAuthAccess" DROP NOT NULL,
ALTER COLUMN "googleOAuthRefresh" DROP NOT NULL;
