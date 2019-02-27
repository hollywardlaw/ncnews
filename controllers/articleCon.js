const { getArticles } = require('../models/articleMod');

exports.sendArticles = (req, res, next) => {
  const { author } = req.query;
  getArticles(author).then((articles) => {
    res.status(200).send({ articles });
  });
};
