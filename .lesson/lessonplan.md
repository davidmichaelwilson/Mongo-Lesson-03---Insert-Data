# Lesson plan
  
---

Index.js:
```
const express = require('express')
const parser = require('body-parser')
const { MongoClient } = require('mongodb');
const app = express()
const port = 3000

app.use(express.static("public"))
app.use(parser.urlencoded({ extended: true }))

app.post('/users', (req, res) => {

  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  }
  console.log(newUser)
  
  const url = "mongodb+srv://CWilson1901:SbGgwoDeXUPWnuGo@cluster0.guijn.mongodb.net/super_db?retryWrites=true&w=majority";
  const client = new MongoClient(url);
    
    async function insert(user) {
      try {
        await client.connect()
        const collection = client.db("test_db").collection("users");
        await collection.insertOne(user)
        await client.close()
      } 
      catch(err) {
        console.log(err)
      }
    }
    insert(newUser)
  
  res.redirect('/')
})

app.listen(port)
```
  