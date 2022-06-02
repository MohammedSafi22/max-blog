const express = require('express');
const bodyPrser = require('body-parser');

const app = express();

app.use(bodyPrser.json());
app.use(bodyPrser.urlencoded({extended: false}));

app.use((req,res,next)=>{
   //this middleware to solve CORS ports problem // just copy and paste 
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type, Accept");
   res.setHeader(
      "Access-Control-Allow-Methods",
      "GET , POST , PATCH , DELETE , OPTIONS");   
   next();
});
app.post('/api/posts',(req,res,next)=>{
   const post = req.body;
   res.status(201).json({
      message:'post added added',
   });
   next();
});

app.get('/api/posts',(req,res,next)=>{
   const posts = [
      {id:'ljkdjel123', title: 'first server side post',content:'this is coming from server side 1'},
      {id:'jefjeofjfe', title: 'second server side post',content:'this is coming from server side 2'},
   ];
  return res.status(200).json({
      message: 'posts fetch success',
      posts:posts
   });
})

module.exports = app;