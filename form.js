const express = require('express');
const app = express();
var nodemailer=require('nodemailer');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shivang:shivang@cluster0-4mdfp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri,{useNewUrlParser: true });
let PORT = process.env.PORT || 3000

  app.use(express.urlencoded({
    extended : true
  }))
  app.use(express.json())
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'shivang7427@gmail.com',
  pass: 'vasu123@'
  }
  });

  let f
  MongoClient.connect(uri, (err, client) => {
  if (err) throw err;
  taskdb = client.db("taskdb")
  f = taskdb.collection("details")
  });
  
  app.get("/",(req,res)=>{
  res.sendFile(__dirname + '/fhtml.htm')
  });
  
  app.post("/form",(req,res)=>{
  console.log(req.body);
  var mailOptions = {
  from: 'shivang7427@gmail.com',
  to: req.body.email,
  subject: 'Confirmation email',
  text: 'Thanks for choosing us'+req.body.name
  };  
  transporter.sendMail(mailOptions, function(error, info){
  if (error) 
  {
  console.log(error);
  }
  else 
  {
  console.log('Email sent: ' + info.response);
  }
  });
  f.insertOne(req.body, (err, data) => {
  if(err)
  {
  console.log(err)
  }
  else
  {
  console.log(data)
  res.send("Thanks "+req.body.name+" for choosing us!!")
  }
  })
  });
  app.listen(PORT,()=>{
  console.log('Server started!')
  });
  