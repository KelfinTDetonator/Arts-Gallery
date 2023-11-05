const { collections, users } = require('../../models/prismaClient')
const response = require('../../utils/response.utils')
const { validateMIMEType } = require('validate-image-type')
const { CustomError } = require('../../utils/customError.utils')
const userController = require('./users.controller')

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

            let { title, description, artistId } = req.body
            const upload = await collections.create({
                data: {
                    photo: imageUrl,
                    title,
                    description,
                    artistId: parseInt(artistId)
                }
            });
            return res.status(201).json(
                response.success("Posted successfully", upload)
            )
        } catch (error) {
            console.log(error)
            if(error.statusCode){
                return res.status(error.statusCode).json(response.error(error.message))
            }
            return res.status(500).json(response.error(error.message))
        }
    },
    getCollections: async(req, res) => {
        try {
            const data = await collections.findMany();
            if(!data){
                throw new CustomError(500, "Internal Server Error")
            }
            res.status(200).json(
                response.success("Data fetched 200 OK", data)
            )
        } catch (error) {
            if(error.statusCode){
                return res.status(error.statusCode).json(response.error(error.message))
            }
            return res.status(500).json(response.error(error.message))
        }
    },
    getDetailCollectionByUserId: async (req, res, next) => {
        try {
            const userId = parseInt(req.params.id);
            if(typeof userId !== 'number'){
                throw new CustomError(400, "Bad syntax")
            }

            const getUser = await users.findUnique({
                where: {id: userId}
            })
            if(!getUser){
                throw new CustomError(404, "User not found")
            }
            delete getUser.password

            const getCollectionByUserId = await collections.findMany({
                where: {
                    artistId: userId
                }
            })

            if(!getCollectionByUserId){
                throw new CustomError(404, "Not Found!")
            }

            res.status(200).json(
                response.success("Data fetched 200 OK", getCollectionByUserId)
            )
        } catch (error) {
            console.log(error);
            if(error.statusCode){
                res.status(error.statusCode).json(response.error(error.message)); return;
            } else {
                res.status(500).send("Internal Server Error"); return;
            }
        }
    }
}