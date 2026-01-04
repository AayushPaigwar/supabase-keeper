-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupabaseConfig" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "supabase_url" TEXT NOT NULL,
    "anon_key" TEXT NOT NULL,
    "schema_sql" TEXT NOT NULL,
    "last_pinged_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupabaseConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "SupabaseConfig_user_id_idx" ON "SupabaseConfig"("user_id");

-- CreateIndex
CREATE INDEX "SupabaseConfig_is_active_idx" ON "SupabaseConfig"("is_active");

-- AddForeignKey
ALTER TABLE "SupabaseConfig" ADD CONSTRAINT "SupabaseConfig_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
