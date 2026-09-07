import "dotenv/config";

import prisma from "../db/prisma";

import { uefa } from "../data/premierLeague";

async function main() {
  for (const team of uefa) {
    await prisma.team.update({
      where: {
        name: team.name,
      },
      data: {
        uefaRanking: team.uefa,
      },
    });

    console.log(`${team.name} atualizado.`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });