import "dotenv/config";

import prisma from "../db/prisma";
import { getTeamsByLeague } from "../services/footballApi";

async function main() {
  const teams = await getTeamsByLeague(39, 2024);

for (const team of teams) {
  await prisma.team.upsert({
    where: {
      apiId: team.team.id,
    },
    update: {
      name: team.team.name,
      shortName: team.team.code,
      crest: team.team.logo,
      founded: team.team.founded,
      country: team.team.country,
    },
    create: {
      apiId: team.team.id,
      name: team.team.name,
      shortName: team.team.code,
      crest: team.team.logo,
      founded: team.team.founded,
      country: team.team.country,
    },
  });

  console.log(`✅ ${team.team.name} salvo.`);
}
}
main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });