import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const wines = await prisma.wine.findMany({
    orderBy: { id: "asc" },
  })
  return NextResponse.json(wines)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    console.log("JSON", json)
    const wine = await prisma.wine.create({
       data: json
    })

    return new NextResponse(JSON.stringify(wine), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 })
  }
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    console.log("JSON", json)
    const updateWine = await prisma.wine.update({
      where: { id: json.id },
      data: {
        producer: json.producer,
        wineName: json.wineName,
        country: json.country,
        region: json.region,
        subRegion: json.subRegion,
        type: json.type,
      },
    })

    return new NextResponse(JSON.stringify(updateWine), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 })
  }
}

// export async function POST(request: Request) {
//   try {
//     const json = await request.json();

//     const user = await prisma.country.create({
//       data: json,
//     });

//     return new NextResponse(JSON.stringify(user), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     if (error.code === "P2002") {
//       return new NextResponse("Country already exists", {
//         status: 409,
//       });
//     }
//     return new NextResponse(error.message, { status: 500 });
//   }
// }
