-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlagColoringGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "game_id" TEXT NOT NULL,
    CONSTRAINT "FlagColoringGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuessMapGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country_code" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "game_id" TEXT NOT NULL,
    CONSTRAINT "GuessMapGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuessFlagGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "item" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "game_id" TEXT NOT NULL,
    CONSTRAINT "GuessFlagGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GuessCapitalGame" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country_code" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "game_id" TEXT NOT NULL,
    CONSTRAINT "GuessCapitalGame_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "FlagColoringGame_game_id_key" ON "FlagColoringGame"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "GuessMapGame_game_id_key" ON "GuessMapGame"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "GuessFlagGame_game_id_key" ON "GuessFlagGame"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "GuessCapitalGame_game_id_key" ON "GuessCapitalGame"("game_id");
