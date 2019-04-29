const endpoints = {
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
    description: 'adds a new article and responds with the posted article',
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
};

module.exports = endpoints;
