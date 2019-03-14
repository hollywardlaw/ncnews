const usersRouter = require('express').Router();
const { sendUsers, postUser } = require('../controllers/userCon');
const { handle405 } = require('../error handling/index');

usersRouter.route('/')
  .get(sendUsers)
  .post(postUser)
  .all(handle405);

module.exports = usersRouter;
