import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ActionDB from "./actionDB"
import { where } from "firebase/firestore";

const prisma = new PrismaClient()


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
                result = await prisma.intro_home.findMany({
                    include: {
                        image_path: true
                    },
                    where: {
                        introduct: {
                            startsWith: "image"
                        },
                    }
                })
                break;
            case ActionDB.CREATE:
                result = await prisma.intro_home.create({
                    data: {
                        // id_image_path: formData.id_image_path,
                        introduct: formData.introduct,
                        // image_path: {
                        //     create: {
                        //         image_path: formData.image_path
                        //     }
                        // }
                    },
                })
                break;
            case ActionDB.UPDATE:
                await prisma.intro_home.update({
                    data: {
                        // id_image_path: formData.id_image_path,
                        introduct: formData.introduct,
                        // image_path: {
                        //     create: {
                        //         image_path: formData.image_path
                        //     }
                        // }
                    },
                    where: {
                        id: formData.id
                    }
                })

                // result = await prisma.$queryRaw`SELECT * FROM catho_schema.intro_home where introduct not like 'image%'  LIMIT 1`
                break;
            case ActionDB.DELETE:
                result = await prisma.intro_home.delete({
                    include: { image_path: true },
                    where: {
                        id: formData.id
                    }
                })
                break;

            default:
                break;
        }

        res.status(200).send(result);
    } catch (error) {
        console.error(`error excute query intro_home--${action}`, error)
    }
    finally {
        prisma.$disconnect();
    }
}


