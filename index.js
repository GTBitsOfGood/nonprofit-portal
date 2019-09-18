const BodyParser = require('body-parser');
const Express = require('express');
const Next = require('next');
const { MongoClient } = require('mongodb');

const MONGO_SERVER_URL = 'mongodb://localhost:27017/test';
const EXPRESS_SERVER_PORT = 3000;

const devMode = process.env.NODE_ENV !== 'production';
const app = Next({ devMode });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    MongoClient.connect(MONGO_SERVER_URL, {
      // avoids deprecated functionality
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((db) => {
        const server = Express();

        server.use(BodyParser.json());
        server.use((req, res, next) => {
          req.db = db;
          next();
        });
        server.get('*', (req, res) => handle(req, res));

        server.listen(EXPRESS_SERVER_PORT);
        console.log(`Listening on ${EXPRESS_SERVER_PORT}`);
      });
  });
