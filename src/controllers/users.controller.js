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
                    password: encryptPassword(password),
                    profile: {
                        name,
                        gender,
                        phone,
                        location,
                    }
                },
                include:{
                    profile: true,
                }
            })
            delete user.password
            return res.status(201).json(
                response.success("Account created successfully", user)
            )
        } catch (err) {
            console.error(err, "\n", err.status)
            res.status(500).json(response.error("Internal Server Error"))
        }

    }
}