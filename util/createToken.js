const JWT_PASS_SECRET = require('../util/constant')
const jwt = require('jsonwebtoken')
let createToken = (id,cedula) => {
    return jwt.sign({ id: id,cedula:cedula }, JWT_PASS_SECRET, { expiresIn: '24h' });
}

module.exports = {createToken}