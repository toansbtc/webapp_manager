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
                result = await prisma.infor.findUnique({
                    where: {
                        user_token: formData.user_token,
                        id: formData.id
                    },
                    include: {
                        image_path: true
                    }
                })
                break;
            case ActionDB.CREATE:
                result = await prisma.infor.create({
                    data: {

                        // id_avata_img_path: formData.id_image_path,
                        user_token: formData.user_token,
                        self_introduc: formData.self_introduc,
                        position: formData.possition,
                        job: formData.job,
                        situation: formData.situation,
                        address: formData.address,
                        number_phone: formData.number_phone,
                        name: formData.name,
                        birth_day: formData.birth_day,
                        image_path: {
                            create: {
                                image_path: formData.image_path
                            }
                        }
                    },
                })
                break;
            case ActionDB.UPDATE:
                result = await prisma.infor.update({
                    data: {
                        // id_avata_img_path: formData.id_image_path,
                        self_introduc: formData.self_introduc,
                        position: formData.possition,
                        job: formData.job,
                        situation: formData.situation,
                        address: formData.address,
                        number_phone: formData.number_phone,
                        name: formData.name,
                        birth_day: formData.birth_day,
                        image_path: {
                            create: {
                                image_path: formData.image_path
                            }
                        }
                    },
                    where: {
                        user_token: formData.user_token,
                        id: formData.id
                    }
                })
                break;
            case ActionDB.DELETE:
                result = await prisma.infor.delete({
                    where: {
                        user_token: formData.user_token,
                        id: formData.id
                    },
                    include: {
                        image_path: true
                    }
                })
                break;

            default:
                break;
        }

        res.status(200).send(result);
    } catch (error) {
        console.error(`error excute query infor--${action}`, error)
    }
    finally {
        await prisma.$disconnect();
    }
}


