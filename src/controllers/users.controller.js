const { users, profiles, collections } = require('../../models/prismaClient')
const { encryptPassword } = require('../../utils/hashPw.utils')
const response = require('../../utils/response.utils')
const { CustomError } = require('../../utils/customError.utils')

module.exports = {
    createUser: async (req, res) => {
        try {
            const { email, password, name, gender, phone, location } = req.body
            const user = await users.create({
                data: {
                    email,
                    password: await encryptPassword(password),
                    profile: { 
                        create:{
                            name,
                            gender,
                            phone,
                            location,
                        }
                    }
                },
                include:{
                    profile: {
                        select:{
                            name: true,
                            gender: true,
                            phone: true,
                            location: true,
                        }
                    },
                }
            })
            delete user.password
            return res.status(201).json(
                response.success("Account created successfully", user)
            )
        } catch (err) {
            console.log(err)
            res.status(500).json(response.error("Internal Server Error"))
        }
    },
    getUserById: async(req, res) => {
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
            res.status(200).json(
                response.success("Data fetched 200 OK", getUser)
            )
    
        } catch (error) {
            console.log(error)
            if(error.statusCode){
                return res.status(error.statusCode).json(response.error(error.message))
            }
            return res.status(500).json(response.error(error.message))
        }
    }
}