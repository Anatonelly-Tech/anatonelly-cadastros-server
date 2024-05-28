const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const routes = require('./routes/router');
app.use('/api', routes);

const port = process.env.PORT ? Number(process.env.PORT) : 3030;
const URL = process.env.URL || `http://localhost:${port}`;

app.listen(port, () => {
  console.log('Server is running on port', port);
  console.log('Server is runnin at', URL);
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'Welcome to the API of the project "AnatonellyServer" of the company "AnatonellyTech" enjoy!. If you want to know more about the project, contact: (45) 99153-6651'
    );
});
