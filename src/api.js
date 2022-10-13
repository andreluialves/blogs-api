require('express-async-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const blogPostsRouter = require('./routers/blogPostsRouter');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/login', authRouter);

app.use('/user', usersRouter);

app.use('/categories', categoriesRouter);

app.use('/post', blogPostsRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
