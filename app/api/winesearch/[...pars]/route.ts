import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

// Return a list of wines from the database by page and size and count of the number of pages
// Can pass * as a filter to return all wines
// Can pass a string to filter the wines by producer or wine name
// The filter is case insensitive
// The filter is applied to both producer and wine name as an OR

export async function GET(
  request: Request,
  { params }: { params: { pars: string[] } }
) {
  const page: number = +params.pars[0];
  const size: number = +params.pars[1];
  const gFilter: string = params.pars[2];
  console.log("GF: ", gFilter, typeof gFilter);
  // Don't query the database if the filter is undefined
  if (gFilter === undefined) {
    console.log("UNDEFINED");
    return NextResponse.json({ rows: [], pageCount: 0 });
  }

  // Define a where clause to filter the wines

  // whereClause is initialized with an empty array as the value of the OR property.
  let whereClause: Partial<{ OR: Prisma.WineWhereInput[] }> = { OR: [] };

  // The variable whereClause is defined with the type Partial<{ OR: Prisma.WineWhereInput[] }>.
  // Partial<T> is a TypeScript utility type that makes all properties of type T optional. 
  // In this case, it makes the OR property optional.
  // Prisma.WineWhereInput refers to the input type defined by Prisma for filtering wine entities in the database.
  // The OR property is an array of Prisma.WineWhereInput[], which means it can hold multiple filter conditions.
  // The initial value of whereClause is set to { OR: [] }, which means there are no initial filter conditions specified.
  // By using this structure, you can dynamically add filter conditions to the OR property of the whereClause object.


  // If the filter is *, then return all wines
  if (gFilter === "*") {
    whereClause = {};
  } else {
    // whereClause = {
    //   OR: [],
    // };

    // whereClause.OR!.push({
    //   // producer: { contains: gFilter, mode: "insensitive" },
    //   producer: { contains: gFilter },
    // });
    // whereClause.OR!.push({
    //   // wineName: { contains: gFilter, mode: "insensitive" },
    //   wineName: { contains: gFilter },
    // });

    //  https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/src/pages/api/filterPosts.ts
    whereClause = {
      OR: [
        {
          producer: {
            contains: Array.isArray(gFilter) ? gFilter[0] : gFilter,
          },
        },
        {
          wineName: {
            contains: Array.isArray(gFilter) ? gFilter[0] : gFilter,
          },
        },
      ],
    };
  }

  const wines = await prisma.wine.findMany({
    where: whereClause,
    skip: page * size,
    take: size,
    include: {bottle: true},
  });
  const pages = await prisma.wine.count({
    where: whereClause,
  });
  return NextResponse.json({
    rows: wines,
    pageCount: Math.ceil(pages / size),
  });
}

// const whereClause: Prisma.WineWhereInput = {
//   // AND: [
//   // {
//   OR: [
//     { producer: { contains: gFilter, mode: "insensitive" } },
//     { wineName: { contains: gFilter, mode: "insensitive" } },
//   ],
//   // },

//   // { country: { contains: "new", mode: "insensitive" } },
//   // ],
// }
// } else {
//   whereClause = {}
// }
