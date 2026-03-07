import { db } from "../../../db";
import { users } from "../../../db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.select().from(users);

  return NextResponse.json({
    success: true,
    data: result,
  });
}