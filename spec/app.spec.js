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
  it('POST status: 400 - if there is no slug or description in the topic, sends a status 400 and an error message', () => {
    const newTopic = {
      description: 'cats are the best',
    };
    return request
      .post('/api/topics')
      .send(newTopic)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 400: bad request');
      });
  });
  it('POST status: 422. If adds a new slug that already exists in the database, send a 422 status and eror message.', () => {
    const newTopic = {
      slug: 'mitch',
      description: 'who loves orange soda?',
    };
    return request
      .post('/api/topics')
      .send(newTopic)
      .expect(422)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 422: Unprocessable Entity');
      });
  });
  it('if invalid method is used, sends a 405 status and an error message', () => request.delete('/api/topics').expect(405).then((res) => {
    expect(res.body.msg).to.equal('Error 405: invalid method');
  }));
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
    it('Takes an author query which filters the articles by the username value specified in the query', () => request.get('/api/articles?author=butter_bridge').expect(200).then((res) => {
      expect(res.body.articles).to.have.length(3);
      expect(res.body.articles[0].author).to.equal('butter_bridge');
      expect(res.body.articles[0]).to.contain.keys('author',
        'title',
        'article_id',
        'topic',
        'created_at',
        'votes',
        'comment_count',
        'body');
    }));
    it('Takes a topic query which filters the articles by a specified topic', () => request.get('/api/articles?topic=mitch').expect(200).then((res) => {
      expect(res.body.articles).to.have.length(11);
      expect(res.body.articles[0]).to.contain.keys('author',
        'title',
        'article_id',
        'topic',
        'created_at',
        'votes',
        'comment_count',
        'body');
      expect(res.body.articles[0].topic).to.equal('mitch');
    }));
    it('if invalid method is used, sends a 405 status and an error message', () => request.delete('/api/articles').expect(405).then((res) => {
      expect(res.body.msg).to.equal('Error 405: invalid method');
    }));
    it('should sort the articles by date by default if no sort_by query is passed', () => request.get('/api/articles').expect(200).then((res) => {
      expect(res.body.articles[0].created_at).to.equal('2018-11-15T00:00:00.000Z');
    }));
    it('should accept a sort_by query, which sorts the articles by any valid column', () => request.get('/api/articles?sort_by=article_id').expect(200).then((res) => {
      expect(res.body.articles[0].article_id).to.equal(12);
    }));
    it('Should accept an `order` query, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)', () => request.get('/api/articles?sort_by=article_id&order=asc').expect(200).then((res) => {
      expect(res.body.articles[0].article_id).to.equal(1);
    }));
    it('GET status: 404. if `sort_by`column doesnt exist, sends a 404 status and throws an error message', () => request.get('/api/aticles?sort_by=invalid_column').expect(404).then((res) => {
      expect(res.body.msg).to.equal('Error 404: page not found');
    }));
    it('GET status: 404. if `order` is not asc or desc, sends a 404 status and throws an error message', () => request.get('/api/aticles?sort_by=article_id&order=invalid_order').expect(404).then((res) => {
      expect(res.body.msg).to.equal('Error 404: page not found');
    }));
    it('POST status: 201 - adds a new article.', () => {
      const newArticle = {
        title: 'New article',
        body: 'Hello I am an article',
        topic: 'mitch',
        author: 'icellusedkars',
      };
      return request.post('/api/articles').send(newArticle).expect(201).then((res) => {
        expect(res.body).to.have.all.keys('article');
        expect(res.body.article).to.be.an('object');
        expect(res.body.article.title).to.equal(
          newArticle.title,
        );
        expect(res.body.article.body).to.equal(
          newArticle.body,
        );
        expect(res.body.article.topic).to.equal(newArticle.topic);
        expect(res.body.article.author).to.equal(newArticle.author);
      });
    });
    it('POST status 400 - if No `title` / `body` / `topic` / `username` in request body sends a 400 status and an error message Error 400: bad request', () => {
      const newArticle = {
        body: 'Hello I am an article',
        topic: 'mitch',
        author: 'icellusedkars',
      };
      return request.post('/api/articles').send(newArticle).expect(400).then((res) => {
        expect(res.body.msg).to.equal('Error 400: bad request');
      });
    });
    it('POST status 422 - if topic/author doesnt exist, send an error 422', () => {
      const newArticle = {
        title: 'New article',
        body: 'Hello I am an article',
        topic: 'mitch',
        author: 'holly',
      };
      return request.post('/api/articles').send(newArticle).expect(422).then((res) => {
        expect(res.body.msg).to.equal('Error 422: Unprocessable Entity');
      });
    });
    it('GET status: 200. accepts an article_id parameter which responds with the article', () => request.get('/api/articles/12').expect(200).then((res) => {
      expect(res.body.articles[0]).to.eql({
        article_id: 12,
        title: 'Moustache',
        body: 'Have you seen the size of that thing?',
        votes: 0,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: '1974-11-26T00:00:00.000Z',
        comment_count: '0',
      });
    }));
    it('GET status: 400. Bad `article_id` (e.g. `/dog`) returns status 400 and an error message', () => request.get('/api/articles/cat').expect(400));
    it('PATCH status: 200. PATCH /api/articles/:article_id updated the votes on the article and responds with the updated article', () => request.patch('/api/articles/12').send({ inc_votes: 1 }).expect(200).then((res) => {
      expect(res.body.article.votes).to.equal(1);
    }));
    it('PATCH status: 200 can accept a negative mumber to reduce the votes', () => request.patch('/api/articles/12').send({ inc_votes: -1 }).expect(200).then((res) => {
      expect(res.body.article.votes).to.equal(-1);
    }));
    it('PATCH status: 400. If invalid `inc_votes` on request body, it sends a 400 status and an error message', () => request.patch('/api/articles/12').send({ inc_votes: 'cat' }).expect(400));
    it('DELETE status: 204. Deletes an article by article ID and responds with status 204 and no content ', () => request.delete('/api/articles/12').expect(204));
    it('DELETE status: 404. Sends a 404 status if the article_id doesnt exist in the db', () => {
      request.delete('/api/articles/99999').expect(404);
    });
    it('DELETE status: 400. Sends a 400 status if article_id isnt a number', () => {
      request.delete('./api/articles/cat').expect(400);
    });
  });
  describe('/articles/:article_id/comments', () => {
    it('GET status: 200. Responds with status 200 and an array of comments for the given `article_id`', () => {
      return request.get('/api/articles/9/comments').expect(200).then((res) => {
        expect(res.body.length).to.equal(2);
        expect(res.body[0]).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body');
      });
    });
  });
});

describe('/bad-url', () => {
  it('GET status:404 responds with error message when request is made with a bad url', () => request
    .get('/bad-url')
    .expect(404)
    .then((res) => {
      expect(res.body.msg).to.equal(
        'Error 404: page not found',
      );
    }));
});
