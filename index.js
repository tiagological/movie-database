const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 1234;
const app = express();
const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => console.log(`> App listening on port ${port}`));
