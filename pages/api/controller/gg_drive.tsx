import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable'
import fs from 'fs'
import path from 'path';


export const config = {
    api: {
        bodyParser: false, // Disable default body parser
    },
};

const IDFolderFather = "1GVDJLe_OeCV52grlVBKbio41b1-eT1Mr";


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
            const file = Array.isArray(files.fileImage) ? files.fileImage[0] : files.fileImage
            console.log(fields)
            const folderName = Array.isArray(fields.folderName) ? fields.folderName[0] : fields.folderName


            const auth = new google.auth.GoogleAuth({
                keyFile: path.join(process.cwd(), process.env.GOOGLE_DRIVE_KEY_PATH),
                scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive.file']
            });


            const driveService = google.drive({ version: 'v3', auth })
            const fileStream = fs.createReadStream(file.filepath);

            const response = await driveService.files.create({
                requestBody: {
                    name: file.originalFilename,
                    mimeType: file.mimetype,
                    parents: [folderName === "Father" ? IDFolderFather : ""]
                },
                media: {
                    mimeType: file.mimetype,
                    body: fileStream
                },
            });

            // const oauth2 = google.oauth2({
            //     auth: auth,
            //     version: 'v2',
            // });

            // const userInfo = await oauth2.userinfo.get();
            // console.log('Authenticated User:', userInfo.data.id);

            res.status(200).json({ message: 'File uploaded successfully', fileId: response.data.id });

        })

    } catch (error) {
        res.status(500).json({ message: error })
        console.log(error)
    }

}
