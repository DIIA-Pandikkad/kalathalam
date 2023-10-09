const { MongoClient } = require("mongodb")

const state = {
  db: null,
};

// const password = encodeURIComponent("MARAMKULAMBIL");

// mongodb connection string
// const url = "mongodb://0.0.0.0:27017";
const url = "mongodb://THOUFEEQUE:9946337540@ac-sumwhnw-shard-00-00.bwfhyhr.mongodb.net:27017,ac-sumwhnw-shard-00-01.bwfhyhr.mongodb.net:27017,ac-sumwhnw-shard-00-02.bwfhyhr.mongodb.net:27017/?replicaSet=atlas-e7nn5j-shard-0&ssl=true&authSource=admin";
// database name
const dbName = "kalathalam";

// create a new mongodb client object
const client = new MongoClient(url);

// function to establish mongodb connection
const connect = async (cb) => {
  try {
    // connecting to mongodb
    await client.connect();
    // setting up database name to the connected client
    const db = client.db(dbName);
    // setting up database name to the state
    state.db = db;
    // callback after connected
    return cb();
  } catch (err) {
    // callback when an error occurs
    return cb(err);
  }
};

// function to get the database instance
const get = () => state.db;

// exporting functions
module.exports = {
  connect,
  get,
};


// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://THOUFEEQUE:MaramkulambilH084@cluster0.bwfhyhr.mongodb.net/?retryWrites=true&w=majority";

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);
