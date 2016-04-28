'use strict'

const bodyParser = require('body-parser');
const joinPaths = require('path').join;
const utils = require('./utils');
const compression = require('compression');
const morgan = require('morgan');

const applyMiddleware = (app, express) => {
  app.use(morgan('dev'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(express.static(joinPaths(__dirname, '../../../dist')));
  
  // wild card
  app.use('/*', (req, res) => res.status(400).send('404'));
  
  app.use(utils.errorHandler);
  app.use(utils.errorLogger);
};

module.exports = applyMiddleware;
