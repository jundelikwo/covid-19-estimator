const express = require('express');
const bodyParser = require('body-parser');

const estimator = require('./src/estimator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());

app.post('/api/v1/on-covid-19', (req, res) => {
  res.json(estimator(req.body));
});
app.listen(3000);

console.log('Express app running on port 3000');

module.exports = app;
