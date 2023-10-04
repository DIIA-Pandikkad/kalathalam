const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/kalathalam';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('mycollection');

    // insert a new document
    const result = await collection.insertOne({ name: 'John Doe' });
    console.log(result);

    // find all documents
    const documents = await collection.find().toArray();
    console.log(documents);
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  connect
  
};
