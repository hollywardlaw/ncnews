const { getArticles } = require('../models/articleMod');

exports.sendArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;
  getArticles({
    author, topic, sort_by, order,
  }).then((articles) => {
    res.status(200).send({ articles });
  }).catch(next);
};
