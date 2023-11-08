const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Middleware
app.use(cors());

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j9gyaso.mongodb.net/your-database-name?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    await client.connect(); // Connect to the MongoDB server

    const collection = client.db('toolsdb').collection('services');
    app.post('/services', async (req, res) => {
      const newProduct = req.body;
      const result = await collection.insertOne(newProduct);
      res.send(result);
      console.log(result)
    });

