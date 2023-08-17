import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { page: string; size: string }
  }
) {
  const page: number = +params.page
  const size: number = +params.size
  const wines = await prisma.wine.findMany({
    skip: page * 5,
    take: size,
  })
  return NextResponse.json(wines)
}
