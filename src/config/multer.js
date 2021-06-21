const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  dest: path.resolve(__dirname, '..','..' ,'public', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,path.resolve(__dirname, '..', '..','public', 'uploads') )
    },
    filename: (req, file, cb) => {
      // crypto.randomBytes(16, (err, hash) => {
      //   if(err) cb(err)
      //   let type = String(file.mimetype)
      //   type = type.slice(6, type.length)
        const fileName = `${req.body.cpf}.${req.body.type}`
        cb(null, fileName)
      // })
    }

  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/jpg',
    ];

    if(allowedMimes.includes(file.mimetype)){
      cb(null, true)
    }else{
      cb(new Error('Arquivo de tipo invalido.'))
    }
  },
}