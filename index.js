const routes = require('./routes/index');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const jsonParser = express.json();

const dbUsername = 'Harvey';
const dbPassword = 'M892451m';
const dbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-7rm8k.gcp.mongodb.net/billforward?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));
app.use(cors({origin: 'http://localhost:8080'}));
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



// app.get("/api/users", function(req, res){
//
//   User.find({}, function(err, users){
//
//     if(err) return console.log(err);
//     res.send(users)
//   });
// });
//
// app.get("/api/users/:id", function(req, res){
//
//   const id = req.params.id;
//   User.findOne({_id: id}, function(err, user){
//
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });
//
// app.post("/api/users", jsonParser, function (req, res) {
//
//   if(!req.body) return res.sendStatus(400);
//
//   const userName = req.body.name;
//   const userAge = req.body.age;
//   const user = new User({name: userName, age: userAge});
//
//   user.save(function(err){
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });
//
// app.delete("/api/users/:id", function(req, res){
//
//   const id = req.params.id;
//   User.findByIdAndDelete(id, function(err, user){
//
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });
//
// app.put("/api/users", jsonParser, function(req, res){
//
//   if(!req.body) return res.sendStatus(400);
//   const id = req.body.id;
//   const userName = req.body.name;
//   const userAge = req.body.age;
//   const newUser = {age: userAge, name: userName};
//
//   User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
//     if(err) return console.log(err);
//     res.send(user);
//   });
// });