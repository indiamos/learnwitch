/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../../server/db');
const app = require('../../../server');

const Newt = db.model('newt');

describe('Server: API: Newt routes', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('/api/newts/', () => {
    const sampleNewts = [
      {
        title: 'Understanding REST',
        url: 'https://spring.io/understanding/REST',
        description: 'By Pivotal Software',
        minutes: 3,
        source: 'Google',
        goals: 'To be able to explain what REST means.',
        // userId: 1,
      },
      // {
      //   title: 'REST API Tutorial: HTTP Methods',
      //   url: 'https://restfulapi.net/http-methods/',
      //   description: 'Determine the most suitable HTTP method for the action performed by API',
      //   minutes: 7,
      //   source: 'Google (get post put patch delete)',
      //   goals: 'To refresh my memory on what GET, PUT, POST, and DELETE are for, and the learn the difference between PUT and PATCH, since I was asked that in an interview and had never before even heard of PATCH.',
      //   // userId: 1,
      // },
    ];

    beforeEach(() => {
      Newt.create(sampleNewts[0]);
      // Newt.create(sampleNewts[1]);
    });

    it('GET /api/newts returns a list of newts', () => request(app)
      .get('/api/newts')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.be.equal('Understanding REST'); // This might not work because the two create commands aren't necessarily going to resolve in the same order. Need to use a bulk create method…
      }));
  });
});
