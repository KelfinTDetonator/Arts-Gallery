const { collections, users } = require('../../models/prismaClient')
const response = require('../../utils/response.utils')
const { validateMIMEType } = require('validate-image-type')
const { CustomError } = require('../../utils/customError.utils')
const userController = require('./users.controller')

module.exports={
    uploadCollection: async(req, res)=>{
        try {
            //Multer adds a body object and a file or files object to the request object -> req.file
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/jpg"];
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            // console.log(req.file.originalname); //original file name nya
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
    },

    editCollection: async(req, res) => {
        try {
            const collectionId = parseInt(req.params.id);
            const {title, description} = req.body;
            if(!(title && description)){
                throw new CustomError(400, "Bad Syntax")
            }

            const collection = await collections.findUnique({
                where: {
                    id: collectionId
                }
            })

            if(!collection){
                throw new CustomError(404, "Collection Not Found")
            }

            const edited = await collections.update({
                where: {
                    id: collection.id
                },
                data:{
                    title,
                    description
                }
            });

            res.status(200).json(response.success("Collection updated successfully", edited))
        } catch (error) {
            console.log(error);
            if(error.statusCode){
                res.status(error.statusCode).json(response.error(error.message)); return;
            } else {
                res.status(500).json(response.error("Internal Server Error")); return;
            }
        }
    },

    deleteCollectionById: async (req, res) => {
        try {
            const collectionId = parseInt(req.params.id);

            const collection = await collections.findUnique({
                where: {
                    id: collectionId
                }
            })

            if(!collection){
                throw new CustomError(404, "Collection Not Found")
            }

            await collections.delete({ where: { id: collectionId } });

            return res.sendStatus(204)
        } catch (error) {
            console.log(error);
            if(error.statusCode){
                res.status(error.statusCode).json(response.error(error.message)); return;
            } else {
                res.status(500).json(response.error("Internal Server Error")); return;
            }
        }
    }
}