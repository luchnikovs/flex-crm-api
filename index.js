const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {dbConnect} = require('./services/dbConnection');
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
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes)


// TODO: to delete after
app.use('/test', express.static('app'));

dbConnect()
  .then(() => {
    app.listen(config.port, () => {
      console.log("Server is waiting for a connection...");
    });
  });

module.exports = app;
