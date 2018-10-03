var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let ApiRoutes = require ('./router');
let Post = require('./models/postModel');
const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',ApiRoutes);

// add some dummy data:
// let dummyPost= new Post({
//   text: "i'm dummy post",
//   comments: [{
//     text:"just a comment",
//     user:"a user ?"
//   }]
// })

// dummyPost.save();


app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
