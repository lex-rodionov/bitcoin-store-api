const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const rootRouter = require('./router');
const logger = require('./services/logger');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to DB');
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use((req, res, next) => {
  logger.logRequest(req);
  next();
});

app.use('/', rootRouter);