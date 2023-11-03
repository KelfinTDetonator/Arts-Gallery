const response = require('../../utils/response.utils')
const { validateMIMEType } = require('validate-image-type')
const { CustomError } = require('../../utils/customError.utils')
const imageKit = require('../../utils/imageKit')
const fsPromises = require('fs').promises;

module.exports = {
    imageKitUpload: async (req, res) => {
        try {
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
            const imageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/${req.file.originalname}`;
            console.log(req.file);
            const validationResult = await validateMIMEType(req.file.path, {
                originalFilename: req.file.originalname,
                allowMimeTypes: allowedMimeTypes,
            });

            if (!validationResult.ok) {
                throw new CustomError(400, "Bad Syntax")
            };
            const fileBuffer = await fsPromises.readFile(req.file.path);
            const uploadResponse = await imageKit.upload({
                file: fileBuffer,
                fileName: req.file.originalname,
            })
            
            return res.json(
                response.success("Image uploaded", uploadResponse)
            )
        } catch (error) {
            if(error.statusCode){
                return res.status(error.statusCode).json(response.error(error.message))
            }
            return res.status(500).json(response.error(error.message))
        }
    }
}