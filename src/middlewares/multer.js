const multer = require('multer');
// const {fileValidation, urlValidation} = require('../../validation/images.validation')


const dest = `./public/images` 
// console.log(dest);

const generate = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, dest)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
        // console.log(file);
    }
})

module.exports = {
    upload: multer({
        storage: generate,
        fileFilter: async function(req, file, cb){
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
            if(allowedMimeTypes.includes(file.mimetype) ){
                cb(null, true);
            } 
                else{
                    const err = cb(new Error(`Only ${allowedMimeTypes.join(", ")} extensions allowed!`))
                    cb(err, false)
                }
        },
        limits: {files: 5},
    
    }),
    onError: (err, next)=>{
        next(err)
    }
}