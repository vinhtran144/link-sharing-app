const crypto = require('crypto');

function genCustomURL(length) {
    // Function to generate a random URL string for each user's page 
    return crypto.randomBytes(length).toString('hex');
}

function genSaltHash(password) {
    // function to generate salt and hash for storing password in a secure way
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function validPassword(password, hash, salt) {
    // function to compare inputed password with hash and salt stored in the database
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports = {genCustomURL,validPassword, genSaltHash};