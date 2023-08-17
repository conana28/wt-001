/* 
This is a TypeScript/JavaScript code snippet that uses Prisma ORM to create a new instance of the PrismaClient and exports it as a constant prisma. Prisma is a type-safe database client that provides a fluent and expressive API for querying and managing databases.
This code uses the global object to store a single instance of the PrismaClient that can be shared across different parts of the application. The globalForPrisma variable is used to access the global object with TypeScript type annotations.
The code first checks if globalForPrisma.prisma is already defined. If it is defined, then it returns the existing instance of the PrismaClient. If it is not defined, it creates a new instance of PrismaClient and sets the log option to ['query'].
The log option specifies that Prisma should log all SQL queries that are executed by the client. This can be useful for debugging and optimizing queries.
Finally, if the NODE_ENV environment variable is not set to 'production', the newly created instance of PrismaClient is stored in the global object for future use.
Overall, this code sets up a single instance of PrismaClient for the entire application and configures it to log all SQL queries.
*/

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
