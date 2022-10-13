const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

require('dotenv').config();
const app = require('./api');

const port = process.env.API_PORT || 3000;

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
