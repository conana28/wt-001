import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { page: string }
  }
) {
  const page: number = +params.page // 'a', 'b', or 'c'
  const wines = await prisma.wine.findMany({
    skip: page * 5,
    take: 5,
  })
  return NextResponse.json(wines)
}
