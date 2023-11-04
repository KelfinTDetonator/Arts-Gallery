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

    }
}