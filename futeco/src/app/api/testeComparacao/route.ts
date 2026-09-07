// src/app/api/test-compare/route.ts

import prisma from "../../../db/prisma";
import { compareTeams } from "../../../game/gameEngine";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guessName = searchParams.get("guess");
  const secretName = searchParams.get("secret");

  if (!guessName || !secretName) {
    return NextResponse.json(
      { error: "Passe ?guess=NomeDoTime&secret=NomeDoTime na URL" },
      { status: 400 }
    );
  }

  const guessedTeam = await prisma.team.findFirst({
    where: { name: { equals: guessName } },
  });

  const secretTeam = await prisma.team.findFirst({
    where: { name: { equals: secretName } },
  });

  if (!guessedTeam || !secretTeam) {
    return NextResponse.json(
      { error: "Um dos times não foi encontrado no banco" },
      { status: 404 }
    );
  }

  const result = compareTeams(guessedTeam, secretTeam);

  return NextResponse.json(result);
}