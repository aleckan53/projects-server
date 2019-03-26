const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
  getUserByEmail(knex, email) {
    return knex('users')
      .where({email})
      .first()
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(payload, subject) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    })
  }
}

module.exports = AuthService