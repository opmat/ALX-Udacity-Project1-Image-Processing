import express, { Request, Response } from 'express';
import supertest from 'supertest';
import app from '../index';

describe('basic test suite', () => {
  it('checks if test module is working properly', () => {
    const testVariable = true;
    expect(testVariable).toBeTruthy();
  });
});

describe('Test GET /view/:imageName', function () {
  it('responds with status 200 and image file', (done) => {
    supertest(app)
      .get('/view/fjord')
      .send({})
      .expect('content-type', /jpeg/)
      .expect(200)
      .expect('content-length', '2421874')
      .end(function (err, res) {
        if (err) throw err;
        return done();
      });
  });

  it('responds with status 400 and notfound image file', (done) => {
    supertest(app)
      .get('/view/goldcliff')
      .send({})
      .expect('content-type', /jpeg/)
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;
        return done();
      });
  });

  it('converts jpg image to png responds with status 200 and png image file', (done) => {
    supertest(app)
      .get('/convertImage/fjord/jpg/png')
      .expect('content-type', /png/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        return done();
      });
  });

  it('responds with status 500 for invalid image file format', (done) => {
    supertest(app)
      .get('/convertImage/fjord/jpg/svg')
      .expect('content-type', /text/)
      .expect(500)
      .end(function (err, res) {
        if (err) throw err;
        return done();
      });
  });
});
