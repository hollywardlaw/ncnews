const { getArticles } = require('../models/articleMod');

exports.sendArticles = (req, res, next) => {
  const { author, topic } = req.query;
  getArticles({ author, topic }).then((articles) => {
    res.status(200).send({ articles });
  }).catch(next);
};
