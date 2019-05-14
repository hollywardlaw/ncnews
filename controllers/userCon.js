const { getUsers, addNewUser, getUserByUsername } = require('../models/userMod');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    }).catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  addNewUser(newUser).then(([user]) => {
    res.status(201).send({ user });
  }).catch(next);
};

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username).then((user) => {
    res.status(200).send({ user });
  }).catch(next);
};
