const routes = require('./routes/index');
const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const jsonParser = express.json();

const dbUsername = 'Harvey';
const dbPassword = 'M892451m';
const dbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-7rm8k.gcp.mongodb.net/billforward?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

app.use(expressSession({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
app.use(express.static(__dirname + "/public"));
// app.use(cors({origin: 'http://localhost:8080'}));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes)

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  err => {
    if (err) return console.log(err);

    app.listen(port, () => {
      console.log("Server is waiting for a connection...");
    });
  }
);
