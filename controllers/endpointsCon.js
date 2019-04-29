const { getEndpoints } = require('../models/endpointsMod');

exports.sendEndpoints = (req, res, next) => {
  const endpoints = getEndpoints();
  res.status(200).send(endpoints);
};
