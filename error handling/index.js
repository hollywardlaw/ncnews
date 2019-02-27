exports.handle404 = (req, res) => {
  res.status(404).send({ msg: 'Error 404: page not found' });
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Error 405: invalid method' });
};

exports.handle400 = (err, req, res, next) => {
  const codes = { 23502: 'Error 400: bad request' };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle422 = (err, req, res, next) => {
  console.log(err);
  res.status(422).send({ msg: 'Error 422: Unprocessable Entity' });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Something broke :(' });
};
