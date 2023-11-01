const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(password, salt)
    } catch (err) {
        console.error(err)
        throw new Error(err)
    }
}

const verifyPassword = async (password, encryptedPassword) => {
    try {
        return await bcrypt.compare(password, encryptedPassword)
    } catch (err) {
        console.error(err)
        throw Error(err)
    }
}

module.exports = {
    encryptPassword,
    verifyPassword,
}