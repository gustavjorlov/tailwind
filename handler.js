const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

module.exports.graphql = async (event, context) => {
  const graphqlPayload = JSON.parse(event.body);
  const typeDefs = `
  type Setlist {
    id: String,
    name: String,
    songs: [Song]
  }
  type Song {
    id: String,
    name: String,
    setlist: Setlist
  }
  type Artist {
    id: String,
    name: String,
    songs: [Song],
    setlists: [Setlist]
  }
  type Query {
    artist: Artist,
    song: Song,
    setlist(artist: String): Setlist
  }
`;

  const getSongs = () => [{ id: '1', name: 'Run to the hills' }, { id: '2', name: 'Sea of madness' }];
  const getSetlists = () => [{ id: '1', name: 'thesetlist' }, { id: '2', name: 'thesetldafafist' }];

  const resolvers = {
    Query: {
      artist: () => {
        return 'bruuuuuuuuce';
      },
      song: () => getSongs()[0],
      setlist: () => getSetlists()
    },
    Setlist: {
      // hejsan: () => { return 'dsfasf'},
      id: (obj) => {
        return obj.id;
      },
      songs: (obj) => {
        console.log(obj);
        return getSongs().filter(song => song.id === obj[0].id)
      }
    },
    Song: {
      setlist: (_, args) => {
        console.log('arrtgsgsgs', args);
        return getSetlists();
      }
    }
  };

  const graphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  return {
    statusCode: 200,
    body: JSON.stringify(await graphql(graphQLSchema, graphqlPayload.query, {}))
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
