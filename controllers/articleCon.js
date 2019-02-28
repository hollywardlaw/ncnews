const { getArticles, addNewArticle } = require('../models/articleMod');

exports.sendArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;
  const { article_id } = req.params;
  getArticles({
    author, topic, sort_by, order,
  }, { article_id }).then((articles) => {
    res.status(200).send({ articles });
  }).catch(next);
};

exports.postArticles = (req, res, next) => {
  const newArticle = req.body;
  addNewArticle(newArticle).then(([article]) => {
    res.status(201).send({ article });
  }).catch(next);
};
