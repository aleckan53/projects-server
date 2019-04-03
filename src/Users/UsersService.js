const bcrypt = require('bcrypt')
const xss = require('xss')

const UsersService = {
  getUsersRequests(knex, id){ 
    return knex('requests')
      .where('sender_id', id)
      .select('*')
      .then(outgoing=> knex('requests')
        .where('recipient_id', id)
        .select('*')
        .then(incoming=> ({
          outgoing,
          incoming
        }))
      )
  },
  getAllUsers(knex) {
    return knex('users')
      .select('*')
  },
  getUserByEmail(knex, email) {
    return knex('users')
      .select('*')
      .where({email})
      .first()
  },
  createUser(knex, user) {
    return knex
      .into('users')
      .insert(user)
      .returning('*')
      .then(rows=> rows[0])
  },
  updateUser(knex, email, updates) {
    return knex('users')
      .where({email})
      .update(updates, ['*'])
  },
  deleteUser(knex, email) {
    return knex('users')
      .where({email})
      .delete()
  },
  validatePassword(password) {
    if(password.length < 8) {
      return {error: 'Password must be longer than 8 characters'}
    }
    if(password.length > 72) {
      return {error: 'Password must be less than 72 characters'}
    }
    if(password.indexOf(' ')>0) {
      return {error: `Password can't have spaces`}
    }
    if(!/([0-9])/.test(password)){
      return {error: 'Password must include at least 1 number'}
    }
  },
  validateEmail(knex, email) {
    return knex('users')
      .where({email})
      .first()
      .then(email=> !!email)
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      email: xss(user.email),
      first_name: xss(user.first_name),
      last_name: xss(user.last_name),
      avatar: xss(user.avatar),
      password: xss(user.password)
    }
  },
  validateAvatar(str) {
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  }
}

module.exports = UsersService