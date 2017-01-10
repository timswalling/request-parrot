'use strict';

const http = require('http');
const querystring = require('querystring');
const url = require('url');

const port = process.env.PORT || 3000;


const listen = function (err) {
  if (err) {
    console.error(err);
    return false;
  }

  console.info(`Server is listening on ${port}`);
};


const parrot = function (request, response) {
  let responseHeaders = {
    'Cache-Control': 'private',
    'Content-Type': 'application/json'
  };
  let requestData = '';
  let requestInfo = {
    headers: request.headers
  };
  let requestUrl = `${request.protocol || request.headers['x-forwarded-proto'] || 'http'}://${request.headers.host}${request.url}`;

  requestInfo.url = url.parse(requestUrl);

  request.on('data', function (chunk) {
    requestData += chunk.toString();
  });

  request.on('end', function () {
    if (requestData) {
      requestInfo.data = querystring.parse(requestData);
    }

    let responseBody = JSON.stringify(requestInfo, null, 4);

    response.writeHead(200, responseHeaders);
    response.write(responseBody);
    response.end();
  });
};


const server = http.createServer(parrot);

server.listen(port, listen);
