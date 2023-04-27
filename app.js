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

app.get("/articles", function(req, res){

    Article.find(function(err, foundArticles){
      if (err) {
        console.log(err);
      } else {
        res.send(foundArticles)
      }
    })
});

app.post("/articles", function(req, res){
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







app.listen(3000, function() {
  console.log("Server Started at port 3000")
});
