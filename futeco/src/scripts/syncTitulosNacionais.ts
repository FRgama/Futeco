import "dotenv/config";

import prisma from "../db/prisma";

import { titles } from "../data/premierLeague";

async function main() {
  for (const team of titles) {
    await prisma.team.update({
      where: {
        name: team.name,
      },
      data: {
        nationalTitles: team.titles,
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