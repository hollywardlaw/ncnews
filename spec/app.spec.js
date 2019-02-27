process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET status:200 - serves up an array of topic objects', () => request.get('/api/topics').expect(200));
  });
  it('GET status:200 - serves up topics', () => request
    .get('/api/topics')
    .expect(200)
    .then((res) => {
      expect(res.body.topics).to.be.an('array');
      expect(res.body.topics[0]).to.contain.keys(
        'slug',
        'description',
      );
      expect(res.body.topics[0]).to.be.an('Object');
    }));
  it('POST status: 201 - adds a new topic', () => {
    const newTopic = {
      slug: 'otters',
      description: 'all about otters',
    };
    return request
      .post('/api/topics')
      .send(newTopic)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.all.keys('topic');
        expect(res.body.topic).to.be.an('object');
        expect(res.body.topic.slug).to.equal(
          newTopic.slug,
        );
        expect(res.body.topic.description).to.equal(
          newTopic.description,
        );
      });
  });
  describe('/articles', () => {
    it('GET status:200 - serves up an array of article objects', () => request.get('/api/articles').expect(200));
    it('GET status:200 - serves up articles', () => request
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
        expect(res.body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
          'comment_count',
          'body',
        );
        expect(res.body.articles[0]).to.be.an('Object');
      }));
    it('Takes an author query which filters the articles by the username value specified in the query', () => {
      request.get('/api/articles?author=butter_bridge').expect(200).then((res) => {
        expect(res.body.articles).to.have.length(3)
          .expect(res.body.articles[0]).to.contain.keys('author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comment_count',
            'body');
      });
    });
  });
});
