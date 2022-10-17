/* eslint-disable import/no-import-module-exports */
import awsServerlessExpress from 'aws-serverless-express';
import app from './app';

require('source-map-support').install();

const server = awsServerlessExpress.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let reqMethod = '';

exports.handler = (event: any, context: any): any => {
  reqMethod = event.requestContent.http.method;

  awsServerlessExpress.proxy(server, event, context);
};
