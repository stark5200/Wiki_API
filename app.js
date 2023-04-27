//jshint esversion:6
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(process.env.MONGO_SRV);

const articleSchema = new mongoose.Schema({
  title: String, 
  content: String
});

const Article = new mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function(req, res){
    Article.find(function(err, foundArticles){
      if (err) {
        console.log(err);
      } else {
        res.send(foundArticles)
      }
    })
  })
  .post(function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    const newArticle = new Article({
      title: req.body.title, 
      content: req.body.content
    }); 

    newArticle.save(function(err){
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added new article");
      }
    });
  })
  .delete(function(req, res){
    Article.deleteMany(
      {}
      ,function(err){
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted articles");
      }
      });
  });


app.listen(3000, function() {
  console.log("Server Started at port 3000")
});


[
  {
      "_id": "6449a980fd50396187a17115",
      "title": "REST",
      "content": "Short for REpresentational State Transfer. it's architectural style for designing APIs."
  },
  {
      "_id": "6449a9dbfd50396187a17116",
      "title": "Bootstrap",
      "content": "Ready made library for styling."
  },
  {
      "_id": "6449a9f4fd50396187a17117",
      "title": "DOM",
      "content": "Document Object Model."
  },
  {
      "_id": "6449aa15fd50396187a17118",
      "title": "React",
      "content": "Framework for web development."
  },
  {
      "_id": "6449e65114ab934afdfabde2",
      "title": "Jack Bauer",
      "content": "Jack Bauer once got into quick sand, the quick sand drowned.",
      "__v": 0
  },
  {
      "_id": "6449e750eba1fab62b5159b5",
      "title": "Elden ring",
      "content": "Mastah pieeeeeeeeeeeeeeeeeeeec!!!!",
      "__v": 0
  }
]