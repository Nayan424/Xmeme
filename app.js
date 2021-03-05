const express=require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');

const app=express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect('mongodb+srv://Nayan424:<password>@xmeme.u2zcj.mongodb.net/memesDB',{useNewUrlParser: true, useUnifiedTopology: true});

const memeSchema=new mongoose.Schema({
    name: String,
    caption: String,
    url: String
});

const Meme=mongoose.model("Meme",memeSchema);

app.get("/",function(req,res){
    res.redirect("/memes");
});

app.get("/memes",function(req,res){
    Meme.find({},function(err,data){
        var l=data.length;
        var s=0;
        if(l>100){
            s=l-100;
        }
        data=data.slice(s,l);
        res.render("memes",{data:data});
    });
});

app.get("/post",function(req,res){
    res.sendFile(__dirname+"/post.html");
});
app.post("/post",function(req,res){
    const meme=new Meme({
        name: req.body.name,
        caption: req.body.caption,
        url: req.body.url
    });
    meme.save();
    res.redirect("/memes");
}); 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
    console.log("Server hss started successfully");
});
