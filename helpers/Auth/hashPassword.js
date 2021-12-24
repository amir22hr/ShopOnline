const bcrypt = require('bcrypt')

const hashPassword = async (pwd) => {
    return await bcrypt.hash(pwd, Number(process.env.SALT_ROUNDS))
}

module.exports = hashPassword