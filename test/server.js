/* eslint-env mocha */
'use strict';

const assert = require('assert');
const request = require('request');

const port = process.env.PORT || 3000;

require('../server');


describe('Request Parrot', function () {
  it('should return JSON data containing the request headers', function (done) {
    let customHeaders = {
      'User-Agent': 'mocha',
      'X-Foo': 'bar'
    };
    let options = {
      headers: customHeaders,
      json: true,
      url: `http://localhost:${port}`
    };

    request(options, function (error, response, body) {
      assert(!error && response.statusCode == 200 && 'headers' in body);

      let hasAllHeaders = Object.keys(customHeaders).every(function (header) {
        return header.toLowerCase() in body.headers;
      });

      assert(hasAllHeaders);
      done();
    });
  });

  it('should return JSON data containing the request\'s `application/x-www-form-urlencoded` data', function (done) {
    let options = {
      form: {
        foo: 'bar'
      },
      json: true,
      method: 'post',
      url: `http://localhost:${port}`
    };

    request(options, function (error, response, body) {
      assert(!error && response.statusCode == 200 && 'data' in body);

      assert.deepEqual(options.form, body.data);

      done();
    });
  });

  it('should return JSON data containing the requested URL', function (done) {
    let options = {
      json: true,
      url: `http://localhost:${port}/foo`
    };

    request(options, function (error, response, body) {
      assert(!error && response.statusCode == 200 && 'url' in body);

      assert.equal(options.url, body.url.href);

      done();
    });
  });
});
