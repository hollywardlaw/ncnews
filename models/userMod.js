const connection = require('../db/connection');

exports.getUsers = users => connection
  .select('users.*')
  .from('users');

exports.addNewUser = user => connection('users').insert(user).returning('*');
