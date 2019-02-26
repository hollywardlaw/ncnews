const { expect } = require('chai');
const {
  getDate,
  createRef,
  replaceTitlesWithID,
  createAuthor,
} = require('../utils');

describe('getDate', () => {
  it('Takes an array of 1 object and converts the timestamp into a date ', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      },
    ];
    getDate(input);
    expect(input[0].created_at).to.be.an.instanceOf(Date);
  });
  it('Takes an array of multiple objects and converts all the timestamps into dates', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1500584273256,
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: 1500659650346,
      },
    ];
    const output = getDate(input);
    expect(output[0].created_at).to.be.an.instanceOf(Date);
    expect(output[1].created_at).to.be.an.instanceOf(Date);
    expect(output[2].created_at).to.be.an.instanceOf(Date);
  });
});

describe('createRef', () => {
  it('Takes an array of length 1 and returns a object with a key value pair of title and article_id', () => {
    const actual = createRef(
      [
        {
          article_id: 18,
          title:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          body:
            'With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.',
          votes: 0,
          topic: 'football',
          author: 'grumpy19',
          created_at: '2018-03-27T23:00:00.000Z',
        },
      ],
      'title',
      'article_id',
    );
    const expected = {
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
    };
    expect(actual).to.eql(expected);
  });
  it('Takes an array of length 2 and returns an object with 2 value pairs', () => {
    const actual = createRef(
      [
        {
          article_id: 18,
          title:
            'The People Tracking Every Touch, Pass And Tackle in the World Cup',
          body:
            'With each click and drag of a mouse, young soccer fanatics are creating the building blocks of the advanced stats that are changing how the sport is played, watched and analyzed. Opta and Prozone are among the companies that have taken soccer stats far beyond goals and saves, into the realm of pass completion percentage, defensive touches, percentage of aerial balls won, tackle percentage and goals scored above expectation. Cameras alone can’t process all these stats. So companies employ people — mostly young, mostly male, most logging matches in their spare time as a second job — to watch matches and document every event. Their work has helped develop stats that capture the value of players who don’t score many goals, but who set them up with pinpoint passing and hustle. Teams use advanced stats to decide which players to buy and put on the pitch. And fans, whether they like it or not, read and hear more numbers than ever before about this sport that for so long bucked the sports-analytics trend.',
          votes: 0,
          topic: 'football',
          author: 'grumpy19',
          created_at: '2018-03-27T23:00:00.000Z',
        },
        {
          article_id: 1,
          title: 'Cats',
          body: 'i love cats',
          votes: 10,
          topic: 'cats',
          author: 'catlady1',
          created_at: '2017-03-27T23:00:00.000Z',
        },
      ],
      'title',
      'article_id',
    );
    const expected = {
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
      Cats: 1,
    };
    expect(actual).to.eql(expected);
  });
});

describe('replaceTitlesWithID', () => {
  it('Takes a data array of length 1 and an ref array of length 1 and returns the data array with the belongs_to key removed and the article_id added for the correct title', () => {
    const commentArray = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
      },
    ];
    const refObj = {
      'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
    };
    const actual = replaceTitlesWithID(
      commentArray,
      refObj,
      'belongs_to',
      'article_id',
    );
    const expected = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
        article_id: 18,
      },
    ];
    expect(actual).to.eql(expected);
  });
});

describe('createAuthor ', () => {
  it('renames the create_by property to author', () => {
    const actual = createAuthor([
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
        article_id: 18,
      },
    ]);
    const expected = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        author: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
        article_id: 18,
      },
    ];
    expect(actual).to.eql(expected);
  });
  it('works for multiple ites in an array ', () => {
    const actual = createAuthor([
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
        article_id: 18,
      },
      {
        body: 'blahblahblah',
        created_by: 'holly',
        votes: 1,
        created_at: 1468087638932,
        article_id: 1,
      },
    ]);
    const expected = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        author: 'tickle122',
        votes: -1,
        created_at: 1468087638932,
        article_id: 18,
      },
      {
        body: 'blahblahblah',
        author: 'holly',
        votes: 1,
        created_at: 1468087638932,
        article_id: 1,
      },
    ];
    expect(actual).to.eql(expected);
  });
});
