import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Filmes',
    description: 'Description'
  },
  basePath: "/api",
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
   securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",      
            name: "access-token",  
            description: "any description..."
        }
    },
  host: 'https://filmes-swart-eight.vercel.app'
};

const outputFile = './api/swagger/swagger-output.json';

const routes = ['../index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc).then(async () => {
   await import('../index.js');
});
