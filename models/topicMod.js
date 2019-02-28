const connection = require('../db/connection');

exports.getTopics = () => connection
  .select('*')
  .from('topics');

exports.addTopic = topic => connection('topics').insert(topic).returning('*');
