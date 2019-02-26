const connection = require('../db/connection');

exports.getTopics = () => connection
  .select('*')
  .from('topics');

// INSERT INTO topics(slug, description)
// VALUES('otters', 'all about otters');

exports.addTopic = topic => connection('topics').insert(topic).returning('*');
