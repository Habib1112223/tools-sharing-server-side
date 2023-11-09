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
// Connect to the MongoDB server

    const collection = client.db('toolsdb').collection('services');
    // const bookingCollection = client.db('toolsdb').collection('booking');
    app.post('/services', async (req, res) => {
      const newProduct = req.body;
      const result = await collection.insertOne(newProduct);
      res.send(result);
      console.log(result)
    });

    app.get('/services', async (req, res) => {
      const query = {};
      const result = await collection.find(query).toArray();
      res.send(result);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await collection.findOne(query)
      res.send(result);
    });

    
    // app.post('/booking',async (req,res) =>{
    //   const booking = res.body;
    // })

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    // No need for empty `finally` block
  }
}
run().catch(console.error);

app.get('/', (req, res) => {
  res.send('Tools is running on the server side');
});

app.listen(port, () => {
  console.log(`Tools server is running on the local server:${port}`);
});




