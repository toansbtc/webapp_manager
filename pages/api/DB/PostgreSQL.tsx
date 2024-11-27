import { prisma } from './prisma'

// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()
export const prisma_sql = async (sql) => {
    const result = await prisma.$queryRaw(sql
    ).then(async () => {
        await prisma.$disconnect()
    })
    return result;
}
