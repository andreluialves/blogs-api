import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './src/routers/authRouter.js',
  './src/routers/blogPostsRouter.js',
  './src/routers/categoriesRouter.js',
  './src/routers/usersRouter.js'];

swaggerAutogen(outputFile, endpointsFiles);