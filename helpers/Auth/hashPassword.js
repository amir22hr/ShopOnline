const bcrypt = require('bcrypt')

const hashPassword = async (pwd) => {
    const saltRounds = Number(process.env.SALT_ROUNDS)
    return await bcrypt.hash(pwd, saltRounds)
}

module.exports = hashPassword