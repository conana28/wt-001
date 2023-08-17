import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface QueryParams {
  wineId?: number;
  vintage?: number;
  producer?: string;
  consume?: Date | null;
} 

function generateWhere(params: QueryParams) {
  const where: any = {};
  return where;
}

const queryParams: QueryParams = {
  // wineId: 3,
  // vintage: 2022,
  // producer: "ku",
  // consume: null,
};

// Get all bottles (No params)
export async function GET(
  req: Request, 
  { params }: { params: {  pars: string[] } },
) {
  console.log("----GET ALL  No params", params);

  const btls = await prisma.bottle.findMany({

where: generateWhere(queryParams),
select: {
  id: true,
  rack: true,
  shelf: true,
  vintage: true,
  cost: true,
  createdAt: true,
  consume: true,
  wine: {
    select: {
      id: true,
      producer: true,
      wineName: true,
    },
  },
},
    orderBy: { vintage: "desc" },
   
  })
  return new NextResponse(JSON.stringify(btls), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

// Add a bottle
export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log("POST JSON", json)
    
    const newBottle = await prisma.bottle.create({
      data: json,
    });

    return new NextResponse(JSON.stringify(newBottle), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }
}



// Add a POST route
// export async function POST(request: Request) {
//   try {
//     const json = await request.json()
//     console.log("BOTTLE POST JSON", json)

//     // const newBottle = await prisma.bottle.create({
//     //   data: {
//     //     rack: json.rack,
//     //     shelf: json.shelf,
//     //     vintage: json.vintage,

//     //     wine: {
//     //       connect: { id: json.wineId },
//     //     },
//     //   },  
//     //   select: {
//     //     id: true,
//     //     rack: true,
//     //     shelf: true,
//     //     vintage: true,
//     //     cost: true,
//     //     createdAt: true,
//     //     consume: true,
//     //     wine: {
//     //       select: {
//     //         id: true,
//     //         producer: true,
//     //         wineName: true,
//     //       },
//     //     },
//     //   },
//     // })
//     // return new NextResponse(JSON.stringify(newBottle), {
//     //   status: 200,
//     //   headers: { "Content-Type": "application/json" },
//     // })
//   } catch (error: any) {  
//     return new NextResponse(error.message, { status: 501 })
//   }
// }


export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    console.log("PATCH JSON", json)
    // const updateWine = await prisma.wine.update({
    //   where: { id: json.id },
    //   data: {
    //     producer: json.producer,
    //     wineName: json.wineName,
    //     country: json.country,
    //   },
    // })

    // return new NextResponse(JSON.stringify(updateWine), {
    return new NextResponse(JSON.stringify("updateWine"), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 })
  }
}


