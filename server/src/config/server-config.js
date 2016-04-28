import express from 'express';
import applyMiddleware from './middleware';

let app = express();
applyMiddleware(app, express);
export default app;
