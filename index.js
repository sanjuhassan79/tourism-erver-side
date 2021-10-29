const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const { json } = require('express');
const app = express()
const port=process.env.POET||5000
 

// middleware
app.use(cors())
app.use(express.json())

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanju1.bssaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });






async function run() {
    try {
      await client.connect();
      const database = client.db("exam-ten");
      const AdventuresCollection = database.collection("Adventures");
      const UserCollection = database.collection("Adventures__users");
      // Query for a movie that has the title 'The Room'

      
      //Post api
app.get('/Adventures',async(req,res)=>{

    const cursor=AdventuresCollection.find({})
    const result= await cursor.toArray();
    res.json(result)
})



      //Post api
      app.post('/Adventures',async(req,res)=>{
          const newAdven=req.body;
          const result = await AdventuresCollection.insertOne(newAdven);
          console.log('hitting the post',req.body);
          console.log(result);
          res,json(result)
      })



// single services
app.get('/Adventures/:id',async(req,res)=>{
const id=req.params.id;
const query={_id:ObjectId(id)};
const users=await AdventuresCollection.findOne(query)
res.json(users)



})

// get api

app.get('/users',async(req,res)=>{

  const cursor=UserCollection.find({})
  const result= await cursor.toArray();
  res.json(result)
})
  //Post Api
  app.post('/users',async(req,res)=>{
    const newAdven=req.body;
    const result = await UserCollection.insertOne(newAdven);
    console.log('hitting the post',req.body);
    console.log(result);
    res,json(result)
})

// single user
app.get('/users/:email',async(req,res)=>{
  const id=req.params.email;
  const cursoer= UserCollection.find({email:req.params.email});
  const users=await cursoer.toArray();
res.send(users)



})

app.delete('/users/:id',async(req,res)=>{
const id=req.params.id;
const query={_id:ObjectId(id)}
const result=await UserCollection.deleteOne(query);
res.json(result)

})

      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);













app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(port,()=>{

console.log('server is Running');

})