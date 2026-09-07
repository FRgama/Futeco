// futeco\src\game\generateDailyTeams.ts

import prisma from "../db/prisma";

function getTodayDateString(): string {
  // Garante consistência de fuso horário (ajuste se quiser UTC-3, por ex.)
  const now = new Date();
  return now.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export async function getDailyTeam() {
  const today = getTodayDateString();

  // 1. Verifica se já existe um desafio pra hoje
  const existingChallenge = await prisma.dailyChallenge.findUnique({
    where: { date: today },
    include: { team: true },
  });

  if (existingChallenge) {
    return existingChallenge.team;
  }

  // 2. Se não existe, sorteia um novo time
  const teamCount = await prisma.team.count();

  if (teamCount === 0) {
    throw new Error("Nenhum time cadastrado no banco.");
  }

  const randomIndex = Math.floor(Math.random() * teamCount);

  const [randomTeam] = await prisma.team.findMany({
    take: 1,
    skip: randomIndex,
  });

  // 3. Salva o desafio do dia (evita corrida entre requests simultâneas)
  const newChallenge = await prisma.dailyChallenge.upsert({
    where: { date: today },
    update: {}, // se outra request já criou entre o findUnique e aqui, não sobrescreve
    create: {
      date: today,
      teamId: randomTeam.id,
    },
    include: { team: true },
  });

  return newChallenge.team;
}