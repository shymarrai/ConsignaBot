const {google} = require('googleapis')
const path = require('path')
const fs = require('fs')

const CLIENT_ID = process.end.CLIENT_ID_DRIVE
const CLIENT_SECRET = process.end.CLIENT_SECRET_DRIVE
const REDIRECT_URI = process.end.REDIRECT_URI_DRIVE

const REFRESH_TOKEN = process.end.REFRESH_TOKEN_DRIVE


const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})
const filePath = path.join(__dirname, 'public','uploads','teste.jpg')




async function uploadFile(){
  try{
    const response = await drive.files.create({
      requestBody: {
        name: 'cpfdeteste.jpg',
        mimeType: 'image/jpg'
      },
      media:{
      mimeType: 'image/jpg',
      body: fs.createReadStream(filePath)
    }
    })

    console.log(response.data)
  }catch(e){
    console.log(e)
  }
}


async function generatePublicUrl(){
  try{
    const fileId = '1iWV5Fc8QPC3ZT65d2CdyhztdIHpcqOan';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink'
    })
    console.log(result.data)
  }catch(e){
    console.log(e)
  }
}

