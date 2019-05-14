process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/bad-url', () => {
    it('GET status:404 responds with error message when request is made with a bad url', () => request
      .get('/bad-url')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 404: page not found');
      }));
  });
  describe('/topics', () => {
    it('GET status:200 - serves up an array of topic objects', () => request.get('/api/topics').expect(200));
    it('GET status:200 - serves up topics', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics[0]).to.contain.keys('slug', 'description');
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
          expect(res.body.topic.slug).to.equal(newTopic.slug);
          expect(res.body.topic.description).to.equal(newTopic.description);
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
    it('if invalid method is used, sends a 405 status and an error message', () => request
      .delete('/api/topics')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 405: invalid method');
      }));
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
    it('Takes an author query which filters the articles by the username value specified in the query', () => request
      .get('/api/articles?author=butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.have.length(3);
        expect(res.body.articles[0].author).to.equal('butter_bridge');
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
      }));
    it('Takes a topic query which filters the articles by a specified topic', () => request
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.have.length(11);
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
        expect(res.body.articles[0].topic).to.equal('mitch');
      }));
    it('if invalid method is used, sends a 405 status and an error message', () => request
      .delete('/api/articles')
      .expect(405)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 405: invalid method');
      }));
    it('should sort the articles by date by default if no sort_by query is passed', () => request
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].created_at).to.equal(
          '2018-11-15T00:00:00.000Z',
        );
      }));
    it('should accept a sort_by query, which sorts the articles by any valid column', () => request
      .get('/api/articles?sort_by=article_id')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(12);
      }));
    it('Should accept an `order` query, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)', () => request
      .get('/api/articles?sort_by=article_id&order=asc')
      .expect(200)
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(1);
      }));
    it('GET status: 400. if `sort_by`column doesnt exist, sends a 400 status and throws an error message', () => request
      .get('/api/articles?sort_by=invalid_column')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 400: bad request');
      }));
    it('GET status: 404. if `order` is not asc or desc, sends a 404 status and throws an error message', () => request
      .get('/api/aticles?sort_by=article_id&order=invalid_order')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Error 404: page not found');
      }));
    it('POST status: 201 - adds a new article.', () => {
      const newArticle = {
        title: 'New article',
        body: 'Hello I am an article',
        topic: 'mitch',
        author: 'icellusedkars',
      };
      return request
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.all.keys('article');
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.title).to.equal(newArticle.title);
          expect(res.body.article.body).to.equal(newArticle.body);
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
      return request
        .post('/api/articles')
        .send(newArticle)
        .expect(400)
        .then((res) => {
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
      return request
        .post('/api/articles')
        .send(newArticle)
        .expect(422)
        .then((res) => {
          expect(res.body.msg).to.equal('Error 422: Unprocessable Entity');
        });
    });
    it('GET status: 200. accepts an article_id parameter which responds with the article', () => request
      .get('/api/articles/12')
      .expect(200)
      .then((res) => {
        expect(res.body.article).to.eql({
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
    it('GET status: 404. `article_id` that doesnt exist(e.g. `/1000`) returns status 404 and an error message', () => request.get('/api/articles/1000').expect(404));
    it('PATCH status: 200. PATCH /api/articles/:article_id updates the votes on the article and responds with the updated article', () => request
      .patch('/api/articles/12')
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).to.equal(1);
      }));
    it('PATCH status: 200 can accept a negative mumber to reduce the votes', () => request
      .patch('/api/articles/12')
      .send({ inc_votes: -1 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).to.equal(-1);
      }));
    it('PATCH status: 400. If invalid `inc_votes` on request body, it sends a 400 status and an error message', () => request
      .patch('/api/articles/12')
      .send({ inc_votes: 'cat' })
      .expect(400));
    it('DELETE status: 204. Deletes an article by article ID and responds with status 204 and no content ', () => request
      .delete('/api/articles/1')
      .expect(204)
      .then((res) => {
        request.get('/api/articles/1').expect(404);
      }));
    it('DELETE status: 404. Sends a 404 status if the article_id doesnt exist in the db', () => request
      .delete('/api/articles/99999')
      .expect(404)
      .then((res) => {
        expect(res.body).to.eql({ msg: 'Error 404: page not found' });
      }));
    it('DELETE status: 400. Sends a 400 status if article_id isnt a number', () => {
      request.delete('./api/articles/cat').expect(400);
    });
    describe('/articles/:article_id/comments', () => {
      it('GET status: 200. Responds with status 200 and an array of comments for the given `article_id`', () => request
        .get('/api/articles/9/comments')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0]).to.contain.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'created_at',
            'body',
          );
        }));
      it('Get status: 200. It sorts comments by date if no sort_by query secified.', () => request
        .get('/api/articles/9/comments')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0].created_at).to.equal('2017-11-22T00:00:00.000Z');
        }));
      it('GET status: 200: It accepts a sort_by query which sorts the articles by any valid column', () => request
        .get('/api/articles/9/comments?sort_by=comment_id')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0].comment_id).to.equal(17);
        }));
      it('GET status: 200. It accepts an order query which can be set to `asc` or `desc` for ascending or descending (defaults to descending)', () => request
        .get('/api/articles/9/comments?sort_by=comment_id&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0].comment_id).to.equal(1);
        }));
      it('POST status: 201. posts a new comment and responds with status 201 and the posted comment.', () => request
        .post('/api/articles/9/comments')
        .send({ author: 'butter_bridge', body: 'new comment' })
        .expect(201)
        .then((res) => {
          expect(res.body.comment.body).to.equal('new comment');
          expect(res.body.comment.author).to.equal('butter_bridge');
          expect(res.body.comment.article_id).to.equal(9);
        }));
    });
  });

  describe('/comments/:comment_id', () => {
    it('PATCH status: 200. Responds with the updated comment and a 200 status code.', () => request
      .patch('/api/articles/9/comments/1')
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        expect(res.body.comment.votes).to.equal(17);
      }));
  });
  it('PATCH status: 200. Works for negative votes to decrease amount of votes', () => {
    request
      .patch('/api/articles/9/comments/1')
      .send({ inc_votes: -1 })
      .expect(200)
      .then((res) => {
        expect(res.body.comment.votes).to.equal(15);
      });
  });
  it('DELETE status: 204. deletes the given comment by `comment_id` and responds with 204 status', () => request.delete('/api/articles/9/comments/1').expect(204));

  describe('GET /api/users', () => {
    it('GET status:200 - serves up an array of user objects', () => request.get('/api/users').expect(200));
    it('GET status:200 - serves up users', () => request
      .get('/api/users')
      .expect(200)
      .then((res) => {
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[0]).to.contain.keys(
          'username',
          'avatar_url',
          'name',
        );
        expect(res.body.users[0]).to.be.an('Object');
      }));
    it('POST status: 201 - adds a new user', () => {
      const newUser = {
        username: 'Hollycat',
        avatar_url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg',
        name: 'Holly',
      };
      return request
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.all.keys('user');
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.name).to.equal(newUser.name);
          expect(res.body.user.username).to.equal(newUser.username);
        });
    });
    it('GET status: 200. accepts a username parameter which responds with the user', () => request
      .get('/api/users/butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.eql({
          username: 'butter_bridge',
          name: 'jonny',
          avatar_url:
            'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
        });
      }));
  });
  describe('/api', () => {
    it('GET status:200 - serves up a JSON object of available end points', () => request
      .get('/api')
      .expect(200)
      .then((res) => {
        expect(res.body).to.eql({
          'GET /api/topics': {
            description: 'serves up all topics',
            'example response': {
              topics: [
                {
                  slug: 'mitch',
                  description: 'The man, the Mitch, the legend',
                },
                {
                  slug: 'cats',
                  description: 'Not dogs',
                },
              ],
            },
          },
          'POST /api/topics': {
            description: 'posts a new topic',
            'example response': {
              topic: {
                slug: 'otters',
                description: 'all about otters',
              },
            },
          },
          'GET /api/articles': {
            description: 'serves up articles',
            'example response': {
              articles: [
                {
                  article_id: 1,
                  title: 'Living in the shadow of a great man',
                  body: 'I find this existence challenging',
                  votes: 100,
                  topic: 'mitch',
                  author: 'butter_bridge',
                  created_at: '2018-11-15T00: 00: 00.000Z',
                  comment_count: '13',
                },
                {
                  article_id: 3,
                  title: 'Eight pug gifs that remind me of mitch',
                  body: 'some gifs',
                  votes: 0,
                  topic: 'mitch',
                  author: 'icellusedkars',
                  created_at: '2010-11-17T00: 00: 00.000Z',
                  comment_count: '0',
                },
              ],
            },
            queries: ['author', 'topic', 'sort_by', 'order'],
          },
          'POST /api/articles': {
            description:
              'adds a new article and responds with the posted article',
            'example response': {
              article: {
                article_id: 13,
                title: 'New article',
                body: 'Hello I am an article',
                votes: 0,
                topic: 'mitch',
                author: 'icellusedkars',
                created_at: '2019-03-14T00: 00: 00.000Z',
              },
            },
          },
          'GET /api/articles/:article_id': {
            description: 'gets an article by its article ID',
            'example response': {
              articles: [
                {
                  article_id: 33,
                  title: 'Seafood substitutions are increasing',
                  body:
                    "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
                  votes: 0,
                  topic: 'cooking',
                  author: 'weegembump',
                  created_at: '2018-05-30T00:00:00.000Z',
                  comment_count: '5',
                },
              ],
            },
          },
          'PATCH /api/articles/:article_id': {
            description:
              'updates the votes on the article and responds with the updated article',
          },
          'DELETE /api/articles/:article_id': {
            description:
              'deletes an article by article ID and responds with status 204 and no content ',
          },
          'GET /api/articles/:article_id/comments': {
            description: 'serves up the comments for an article ID',
            'example response': [
              {
                comment_id: 272,
                author: 'tickle122',
                article_id: 33,
                votes: 17,
                created_at: '2017-09-26T00:00:00.000Z',
                body:
                  'Distinctio excepturi laboriosam eos aperiam quis amet eum animi minima. Officiis in quia. Est consequatur optio atque nostrum iusto impedit harum quod asperiores.',
              },
              {
                comment_id: 196,
                author: 'cooljmessy',
                article_id: 33,
                votes: 0,
                created_at: '2017-07-15T00:00:00.000Z',
                body:
                  'Qui consequuntur id beatae ut vel a error. Vitae et et. Mollitia soluta neque quibusdam tempore quis quia eos autem magni. Voluptatibus numquam nostrum et enim officiis rerum. Optio quo harum dolore voluptatem sit temporibus rem voluptas rem.',
              },
            ],
          },
          'POST /api/articles/:article_id/comments': {
            description:
              'posts a new comment and responds with status 201 and the posted comment.',
          },
          'PATCH /api/comments/:comment_id': {
            description:
              'updates a comment and responds with the updated comment and a 200 status code.',
          },
          'DELETE /api/comments/:comment_id': {
            description:
              'deletes the given comment by comment ID and responds with 204 status',
          },
          'GET /api/users': {
            description: 'serves up an array of user objects',
            'example response': {
              users: [
                {
                  username: 'tickle122',
                  name: 'Tom Tickle',
                  avatar_url:
                    'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
                },
                {
                  username: 'grumpy19',
                  name: 'Paul Grump',
                  avatar_url:
                    'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
                },
                {
                  username: 'happyamy2016',
                  name: 'Amy Happy',
                  avatar_url:
                    'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
                },
                {
                  username: 'cooljmessy',
                  name: 'Peter Messy',
                  avatar_url: 'https://i.imgur.com/WfX0Neu.jpg',
                },
                {
                  username: 'weegembump',
                  name: 'Gemma Bump',
                  avatar_url:
                    'https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg',
                },
                {
                  username: 'jessjelly',
                  name: 'Jess Jelly',
                  avatar_url:
                    'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
                },
              ],
            },
          },
          'POST /api/users': {
            description: 'adds a new user',
          },
          'GET /api/users/:username': {
            description: 'gets a user object by their username',
            'example response': [
              {
                username: 'tickle122',
                name: 'Tom Tickle',
                avatar_url:
                  'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
              },
            ],
          },
          'GET /api': {
            description: 'serves up a JSON object of available end points',
          },
        });
      }));
  });
});
