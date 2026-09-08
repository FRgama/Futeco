// futeco\src\game\generateDailyTeams.ts

import prisma from "../db/prisma";

function getTodayDateString(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
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