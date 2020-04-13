const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const js2xmlparser = require('js2xmlparser');

const estimator = require('./src/estimator');

const app = express();

const logFile = 'logs.txt';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());

app.post('/api/v1/on-covid-19', (req, res) => {
  const start = new Date();
  const result = estimator(req.body);
  const end = new Date();

  fs.appendFile(logFile, `POST \t ${req.route.path} \t\t 200 \t ${end - start}ms \n`, () => {});

  res.json(result);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  const start = new Date();
  const result = estimator(req.body);
  const end = new Date();

  fs.appendFile(logFile, `POST \t ${req.route.path} \t 200 \t ${end - start}ms \n`, () => {});
  
  res.json(result);
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const start = new Date();
  const result = js2xmlparser.parse("estimate",estimator(req.body));
  const end = new Date();

  fs.appendFile(logFile, `POST \t ${req.route.path} \t 200 \t ${end - start}ms \n`, () => {});
  
  res.set('Content-Type', 'text/xml');
  res.send(result);
});

app.listen(3000);

console.log('Express app running on port 3000');

module.exports = app;
