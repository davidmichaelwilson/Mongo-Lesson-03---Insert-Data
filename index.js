const express = require("express")
const app = express()
const port = 3000
const {MongoClient} = require("mongodb")
const url = "mongodb+srv://davidmichaelwilson:wXRRbRVzvKRcspHw@dmwcluster0.vrpyb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url)

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))    //middleware

app.post('/users', (request, response) => {
  console.log(request.body)    //above middleware allows use of .body

  // const data = {    
  //   firstName: request.body.firstName,
  //   lastName: request.body.lastName,
  //   email: request.body.email,
  //   phone: request.body.phone,
  // }

  async function insertDoc() {
    await client.connect()
    const collection = client.db("test_db").collection("users")
    await collection.insertOne(request.body)

    await client.close()
  }
  insertDoc()

  response.redirect("/")    // sends user back to home page, OR
  // response.sendStatus(200)  //tells user the status of submission
})

app.listen(port)