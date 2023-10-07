const { MongoClient } = require("mongodb")

const state = {
  db: null,
};

// mongodb connection string
const url = "mongodb://0.0.0.0:27017";
// const url = "mongodb+srv://rahmanam90:<NY3RYRQpYnK2KzMI>@cluster0.pomdcox.mongodb.net/";
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