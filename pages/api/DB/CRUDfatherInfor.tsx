import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import ActionDB from "./actionDB"
import { where } from "firebase/firestore";
import { create } from "domain";

const prisma = new PrismaClient()


export default async function prisma_sql(req: NextApiRequest, res: NextApiResponse) {

    const formData = req.body.data;
    const action = req.body.action;
    let result = null;
    try {

        switch (action) {
            case ActionDB.NATIVESQL:
                const sql = formData.sql;
                result = await prisma.$queryRaw(Prisma.sql([sql]))
                break;
            case ActionDB.GETLISTDATA:
                result = await prisma.farther_intro.findMany(
                    {
                        include: { image_path: true }
                    }
                )
                break;
            case ActionDB.GETDATA:
                result = await prisma.farther_intro.findUnique(
                    {
                        where: {
                            id: formData.id

                        },
                        include: {
                            image_path: true
                        }
                    }


                )
                break;
            case ActionDB.CREATE:
                result = await prisma.farther_intro.create({
                    data: {
                        name: formData.name,
                        time_start: new Date(formData.time_start),
                        office: formData.office,
                        introduction: formData.introduction,
                        image_path: {
                            create: {
                                image_path: formData.image_path
                            },
                        },
                    },
                })
                break;
            case ActionDB.UPDATE:
                result = await prisma.farther_intro.update(
                    {
                        where: {
                            id: formData.id
                        },
                        data: {
                            name: formData.name,
                            time_start: formData.time_start,
                            office: formData.office,
                            introduction: formData.introduction,
                            // id_image_path: formData.id_image_path,
                            image_path: {
                                update: {
                                    image_path: formData.image_path
                                },
                            },
                        },

                    })
                break;
            case ActionDB.DELETE:
                result = await prisma.farther_intro.delete({
                    where: {
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
        console.error(`error excute query farther_intro--${action}`, error)
    }
    finally {
        prisma.$disconnect();
    }
}

