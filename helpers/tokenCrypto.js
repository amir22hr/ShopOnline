var SHA256 = require("crypto-js/sha256");

const tokenCrypto = async (email, name) => {
    return await SHA256(email, name).toString()
}

module.exports = tokenCrypto