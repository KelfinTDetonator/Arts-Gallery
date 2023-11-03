const { collections } = require('../../models/prismaClient')
const response = require('../../utils/response.utils')
const { validateMIMEType } = require('validate-image-type')
const { CustomError } = require('../../utils/customError.utils')

module.exports={
    uploadCollection: async(req, res)=>{
        try {
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

            const validationResult = await validateMIMEType(req.file.path, {
                originalFilename: req.file.originalname,
                allowMimeTypes: allowedMimeTypes,
            });

            if (!validationResult.ok) {
                throw new CustomError(400, "Bad Syntax")
            }

            let { title, description, artist_id } = req.body
            const upload = await collections.create({
                data: {
                    photo: imageUrl,
                    title,
                    description,
                    artist_id: parseInt(artist_id)
                }
            });
            return res.status(201).json(
                response.success("Posted successfully", upload)
            )
        } catch (error) {
            if(error.statusCode){
                return res.status(error.statusCode).json(response.error(error.message))
            }
            return res.status(500).json(response.error(error.message))
        }
    }
}