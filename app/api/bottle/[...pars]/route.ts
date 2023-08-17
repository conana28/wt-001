import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { pars: string[] } }
) {
  
  console.log("Bottle/xx", params.pars.length, params.pars)

  const query: {[key: string]: string | number} = {}; 

  for (let index = 0; index < params.pars.length; index++) {
    const element = params.pars[index];
    // split the queryString by the = character, which returns an array 
    // with two elements: key and the value of the query parameter.
    const [key, value] = element.split("=");
    // array destructuring to assign the key and value to separate variables.
    // console.log("Key===", key)
    if (key === "vint" || key === "wineId" || key === "bId") {
      // console.log("Vintage", key)
      query[key] = parseInt(value);
    }else{
      console.log("Else", key)
      query[key] = value; 
    }
     
  }

  // console.log(query)

  interface QueryParams {
    bId?: number;  // bottleId
    wineId?: number;
    vint?: number; //vintage
    rack?: string; //rack
    shelf?: string; //shelf
    name?: string; // producer or wineName
    consume?: string;  // show consumed or not
  }
  
  function generateWhere(query: QueryParams) {
    const where: any = {};
    // Search for valid search params and create where object
    if (query.bId) {
      where.id = { equals: query.bId };
    }
    if (query.wineId) {
      where.wineId = { equals: query.wineId };
    }
    if (query.vint) {
      where.vintage = { equals: query.vint };
    }
    if (query.rack) {
      where.rack = { equals: query.rack};
    }
    if (query.shelf) {
      where.shelf = { equals: query.shelf};
    }
    if (query.name) {
      where.wine = {
        OR: [
          {producer: { contains: query.name } },
          { wineName: { contains: query.name } },
        ],
      };
    }
  
    // if (query.consume) {
    //   where.consume = { equals: query.consume.toISOString() };
    // }
  if (query.consume) {
    // where.consume = { not: {equals: new Date("1970-01-01T00:00:00.000Z") }};
    where.consume = { not: {equals: null }};
  }

    console.log("where",where)
    return where;
  }

  const btls = await prisma.bottle.findMany({
    where: generateWhere(query),
    include: { wine: true },
    orderBy: { vintage: "asc" },

      })
  // console.log("----Find many:",btls)
  return new NextResponse(JSON.stringify(btls), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

// Update route
export async function PATCH(
  request: Request,
  { params }: { params: { pars: string[] } }
) {
  
  // console.log("PATCH Bottle", params.pars.length, params.pars)
  const json = await request.json()
  // console.log("PATCH JSON", json)
  const updateBtl = await prisma.bottle.update({
    where: { id: +params.pars},
    data: json, 
  })
  
  return new NextResponse(JSON.stringify(updateBtl), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

// Delete route
export async function DELETE(
  request: Request,
  { params }: { params: { pars: string[] } }
) {
  await prisma.bottle.delete({
    where: { id: +params.pars},
  })

  return NextResponse.json({ message: "Bottle id: " + params.pars  +" deleted" }, { status: 200 });

} 
