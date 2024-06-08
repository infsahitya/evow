/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[whatsapp]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_email_key" ON "contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_key" ON "contact"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contact_whatsapp_key" ON "contact"("whatsapp");
