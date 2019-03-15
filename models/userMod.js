const connection = require('../db/connection');

exports.getUsers = () => connection
  .select('users.*')
  .from('users');

exports.addNewUser = user => connection('users').insert(user).returning('*');

exports.getUserByUsername = username => connection.from('users')
  .select('users.*')
  .where({ username });
