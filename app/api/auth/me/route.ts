import { NextResponse } from "next/server";
import { getSessionLearner } from "../../../../lib/auth/session";

export async function GET() {
  const user = await getSessionLearner();
  return NextResponse.json({ user });
}
