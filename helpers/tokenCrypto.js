var SHA256 = require("crypto-js/sha256");

const tokenCrypto = (email, name) => {
    //token maker
    return SHA256(email, name).toString()
}

module.exports = tokenCrypto