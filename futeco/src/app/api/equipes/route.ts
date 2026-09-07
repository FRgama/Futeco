// futeco\src\app\api\equipes\route.ts
import prisma from "../../../db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const teams = await prisma.team.findMany({
    select: { id: true, name: true, crest: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(teams);
}