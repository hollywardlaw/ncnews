const {
  getArticles, addNewArticle, updateArticle, removeArticle,
} = require('../models/articleMod');

exports.sendArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;
  const { article_id } = req.params;
  getArticles({
    author, topic, sort_by, order,
  }, article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    }).catch(next);
};

exports.postArticles = (req, res, next) => {
  const newArticle = req.body;
  addNewArticle(newArticle).then(([article]) => {
    res.status(201).send({ article });
  }).catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  if (typeof inc_votes !== 'number') {
    res.status(400).send({ msg: 'Error 400: bad request' });
  } else {
    updateArticle(article_id, inc_votes).then(([article]) => {
      res.status(200).send({ article });
    }).catch(next);
  }
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle(article_id).then(() => {
    res.sendStatus(204);
  }).catch(next);
};
