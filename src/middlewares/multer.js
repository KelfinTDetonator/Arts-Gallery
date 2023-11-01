const multer = require('multer');
const {fileValidation, urlValidation} = require('../../validation/images.validation')

const dest = `./public/images` 
console.log(dest);

const generate = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

module.exports = {
    upload: multer({
        storage: generate,
        fileFilter: async (req, file, cb)=>{
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
            if(allowedMimeTypes.includes(file.mimetype) && 
               await fileValidation(file)
            ){
                cb(null, true);
            } 
                else{
                    cb(null, false)
                    cb(new Error(`Only ${allowedMimeTypes.join(", ")} extensions allowed!`))
                }
        },
        limits: {files: 5},
    })
}