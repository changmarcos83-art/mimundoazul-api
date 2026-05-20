-- CreateTable
CREATE TABLE "testimonios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "relacion" TEXT,
    "mensaje" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL DEFAULT 5,
    "avatar_url" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "testimonios_activo_idx" ON "testimonios"("activo");
