/* eslint-disable import/no-import-module-exports */
import awsServerlessExpress from 'aws-serverless-express';
import app from './app';
import reqCache from './utils/reqCache';

require('source-map-support').install();

const server = awsServerlessExpress.createServer(app);

exports.handler = (event: any, context: any): any => {
  reqCache.method = event.requestContext.http.method;

  awsServerlessExpress.proxy(server, event, context);
};
