import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const wineTypes = await prisma.wineType.findMany({
    orderBy: { id: "asc" },
  })
  return NextResponse.json(wineTypes)
}