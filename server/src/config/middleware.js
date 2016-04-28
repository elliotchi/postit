import { json, urlencoded } from 'body-parser';
import { join } from 'path';
import { errorHandler, errorLogger } from './utils';
import compression from 'compression';
import morgan from 'morgan';

export default (app, express) => {
  app.use(morgan('dev'));
  app.use(compression());
  app.use(json());
  app.use(urlencoded({
    extended: true
  }));
  
  // app.use(express.static(join(__dirname, '../../../dist')));
  
  app.use('/', (req, res) => {
    res.send('hi');
  });
  
  // wild card
  app.use('/*', (req, res) => {
    res.status(400).send('404: page not found');
  });
  app.use(errorHandler);
  app.use(errorLogger);
}
