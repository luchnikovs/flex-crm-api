const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const {dbConnect} = require('./appHelpers');
const config = require('./config');
const routes = require('./routes/index');

const app = express();

// app.use(expressSession({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false
// }));
// app.use(express.static(__dirname + "/public"));
// app.use(cors({origin: 'http://localhost:8080'}));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes)

dbConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log("Server is waiting for a connection...");
    });
  });

module.exports = app;
