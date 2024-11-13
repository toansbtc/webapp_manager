import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

const custom_sql = (sql: string) => {
    const result = prisma.account_role.create({
        user_token: 'test',
        role: 1,
        is_active: true
    }).then(async () => {
        await prisma.$disconnect()
    })
}
    