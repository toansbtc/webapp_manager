import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react'
import { excute_mySQL } from '../config/connect_DB';
import formidable from 'formidable'
import fs from 'fs'
import path from 'path';


import configdrive from '../config/google_drive_key.json'
import configauth from '../config/google_dev_console_key.json'
import { handle } from '../Function/googleDriveFunction';
export const config = {
    api: {
        bodyParser: false, // Disable default body parser
    },
};
export default async function gg_drive(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
        return res.status(405).json({ message: 'method not allowed' });

    try {
        const form = formidable({
            keepExtensions: true,
            multiples: false
        })
        form.parse(req, async function (err, fields, files) {

            if (err)
                console.log(err)
            const file = Array.isArray(files.file_image) ? files.file_image[0] : files.file_image

            // const response = await handle(file)
            // console.log('return data', response.data.id)
            // res.status(200).json({ message: 'File uploaded successfully', fileId: response.data.id });

            const auth = new google.auth.GoogleAuth({
                keyFile: path.join(process.cwd(), process.env.GOOGLE_DRIVE_KEY_PATH),
                scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive.file']
            });

            const driveService = google.drive({ version: 'v3', auth })
            const fileStream = fs.createReadStream(file.filepath);

            const response = await driveService.files.create({
                requestBody: {
                    name: file.originalFilename,
                    mimeType: file.mimetype
                },
                media: {
                    mimeType: file.mimetype,
                    body: fileStream
                },
            });

            const oauth2 = google.oauth2({
                auth: auth,
                version: 'v2',
            });

            const userInfo = await oauth2.userinfo.get();
            console.log('Authenticated User:', userInfo.data.email);

            res.status(200).json({ message: 'File uploaded successfully', fileId: response.data.id });

        })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }
    // const { file_image, displayName } = req.body;


    // const drive_folder = '1Ds2Gef__GD0ImqxAO2WI8j_E3PeLjkTu';

    // const auth = new google.auth.GoogleAuth({
    //     keyFile: './config/google_drive_key.json',
    //     scopes: ['https://www.googleapis.com/auth/drive.file']
    // })
    // const drive_service = google.drive({ version: 'v3', auth });
    // res.send(file_image)

}
