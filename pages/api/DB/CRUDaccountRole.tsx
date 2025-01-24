import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ActionDB from "./actionDB"
import { where } from "firebase/firestore";

const prisma = new PrismaClient({
    log: ["error"],
})

prisma.$connect()
export default async function prisma_sql(req: NextApiRequest, res: NextApiResponse) {
    const action = req.body.action;
    const formData = req.body.data;
    let result = null;
    try {

        switch (action) {
            case ActionDB.NATIVESQL:
                const sql = formData.sql;
                result = await prisma.$queryRaw(Prisma.sql([sql]))
                break;
            case ActionDB.GETDATA:
                result = await prisma.account_role.findUnique({
                    where: {
                        user_token: formData.user_token
                    }
                })
                break;
            case ActionDB.CREATE:
                result = await prisma.account_role.create({
                    data: {
                        user_token: formData.user_token,
                        role: formData.role,
                        is_active: formData.is_active,
                    },
                })
                break;
            case ActionDB.UPDATE:
                result = await prisma.account_role.update({
                    data: {
                        role: formData.role,
                        is_active: formData.is_active,
                        password: formData.password,

                    },
                    where: {
                        user_token: formData.user_token,
                        AND: {
                            user_token: 'Admin'
                        }
                    }
                })
                break;
            case ActionDB.DELETE:
                result = await prisma.account_role.delete({
                    where: {
                        user_token: formData.user_token
                    }
                })
                break;

            default:
                break;
        }

        res.status(200).send(result);
    } catch (error) {
        console.error(`error excute query account_role--${action}`, error)
    }
    finally {
        await prisma.$disconnect();
    }
}


