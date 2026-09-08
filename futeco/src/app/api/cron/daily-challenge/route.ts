import { NextResponse } from "next/server";
import { getDailyTeam } from "../../../../game/generateDailyTeams";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  const expectedAuthorization = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : null;

  if (!expectedAuthorization || authorization !== expectedAuthorization) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const team = await getDailyTeam();

    return NextResponse.json({
      date: new Date().toISOString().split("T")[0],
      team: team.name,
    });
  } catch (error) {
    console.error("Erro ao gerar desafio diário:", error);
    return NextResponse.json(
      { error: "Não foi possível gerar o desafio diário" },
      { status: 500 }
    );
  }
}