const { graphql, buildSchema } = require('graphql');

module.exports.graphql = async (event, context) => {
  const graphqlPayload = JSON.parse(event.body);
  var schema = buildSchema(`
  type Query {
    setlist(artist: String): Setlist,
    artist: Artist,
    song: Song
  }
  type Setlist {
    id: String,
    name: String,
    songs: [Song]
  }
  type Song {
    id: String,
    name: String,
    setlist: [Setlist]
  }
  type Artist {
    id: String,
    name: String,
    songs: [Song],
    setlists: [Setlist]
  }
`);

  const getSongs = () => [{ name: 'Run to the hills' }, { name: 'Sea of madness' }];
  const getSetlists = () => [{ name: 'thesetlist' }];

  const root = {
    setlist: {
      id: (obj, args) => {
        console.log(obj, args);
        return '1';
      },
      name: () => 'ho',
      songs: (obj, args, context) => {
        console.log(obj, args);
        return getSongs();
      }
    },
    song: (obj, args) => {
      setlist: () => {
        return getSetlists();
      };
    }
  };

  return {
    statusCode: 200,
    body: JSON.stringify(await graphql(schema, graphqlPayload.query, root))
  };
};

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Tailwind v1.0! Your function executed successfully!',
      input: event
    })
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
