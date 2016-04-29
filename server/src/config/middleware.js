'use strict'

const { json, urlencoded } = require('body-parser');
const { join } = require('path');
const { errorHandler, errorLogger } = require('./utils');
const compression = require('compression');
const morgan = require('morgan');

const applyMiddleware = (app, express) => {
  app.use(morgan('dev'));
  app.use(compression());
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  
  app.use(express.static(join(__dirname, '../../../dist')));
  
  // wild card
  app.use('/*', (req, res) => res.status(400).send('404'));
  
  app.use(errorHandler);
  app.use(errorLogger);
};

module.exports = applyMiddleware;
