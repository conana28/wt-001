import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    id: string
}

// Get a single wine by id

export async function GET(_: Request, { params }: { params: Params }) {
        try {
            // const id = params.id;
            const wine = await prisma.wine.findUnique({
                where: { id: +params.id },
                include: { bottle: true },
            });
    
            if (!wine) {
                throw new Error(`Wine with id ${params.id} not found.`);
            }

            return NextResponse.json(wine, {
                status: 200,
            });
        } catch (error: any) {
            // console.log("ErrorX: ",error.message);
            return NextResponse.json(error.message, {
                status: 500,
            });
        }
    }

// Delete a single wine by id

export async function DELETE(_: Request, { params }: { params: Params }) {
    try {
        await prisma.wine.delete({
            where: { id: +params.id},
          })
          // Can't use 204 status code dictates no response body should be present.
          return NextResponse.json({ message: "Wine id: " + params.id  +" deleted" }, { status: 200 });
      } catch (error: any) {
        console.log("Error: ",error.code);
        return NextResponse.json({ message: "Unable to delete wine: [" + params.id  + 
                "] code: " + error.code +"-" + error.message }, { status: 500 });
      }
  } 
