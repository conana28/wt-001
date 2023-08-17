import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const wines = await prisma.wine.findMany({
    skip: 5,
    take: 5,
  })
  return NextResponse.json(wines)
}
