// src/app/api/usuario/route.ts

import prisma from "../../../db/prisma";
import { getDailyTeam } from "../../../game/generateDailyTeams";
import { compareTeams } from "../../../game/gameEngine";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { teamName } = await request.json();

  if (!teamName) {
    return NextResponse.json({ error: "teamName é obrigatório" }, { status: 400 });
  }

  const guessedTeam = await prisma.team.findFirst({
    where: { name: { equals: teamName } },
  });

  if (!guessedTeam) {
    return NextResponse.json({ error: "Time não encontrado" }, { status: 404 });
  }

  const secretTeam = await getDailyTeam();
  const result = compareTeams(guessedTeam, secretTeam);
  const isCorrect = guessedTeam.id === secretTeam.id;

  return NextResponse.json({ result, isCorrect });
}