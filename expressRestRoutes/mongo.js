const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'testmongodb';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('hapsa');
  const users= await collection.find({}).toArray();
    console.log(users);



  // the following code examples can be pasted here...

  return 'done.';
}


main()
  .then()
  .catch()
  .finally(() => client.close());