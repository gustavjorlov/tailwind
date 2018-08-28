const { graphql, buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// // The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  }
};

// // Run the GraphQL query '{ hello }' and print out the response
graphql(schema, "{ hello }", root).then(response => {
  console.log(response);
  return {de: 'rp'};
});

module.exports.graphql = async (event, context) => {
  console.log(event, context);
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
