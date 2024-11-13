import { GoogleApis, google } from 'googleapis'
import apikey from '../config/google_drive_key.json'
import configauth from '../config/google_dev_console_key.json'
import { resolve } from 'path';
import { rejects } from 'assert';
import fs from 'fs'
import formidable from 'formidable'


export async function handle(file: formidable.File) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: 'service_account',
                project_id: apikey.project_id,
                private_key: apikey.private_key,
                client_email: apikey.client_email
            },
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        })

        const drive = google.drive({ version: 'v3', auth });

        const filePath = file.filepath;

        const media = {
            body: fs.createReadStream(filePath),
        }
        const response = await drive.files.create({
            media: media,
            fields: 'id'
        })
        const result = await drive.files.get({
            fileId: response.data.id,
            fields: 'id,name',
        })
        console.log('data', result.data)
        return response;
    } catch (e) {
        console.log(e)
    }
}
