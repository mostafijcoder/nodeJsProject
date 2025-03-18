const { MongoClient } = require('mongodb');

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database and Collection Name
const dbName = 'websiteDB';
const collectionName = 'hits';

// Function to increment the website hit counte
async function incrementHitCounter() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('✅ Connected to MongoDB');

        // Select Database and Collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

         //Ensure the collection exists by inserting a dummy document (if necessary)
         const collections = await db.listCollections({ name: collectionName }).toArray();
         if (collections.length === 0) {
             console.log(`⚡ Creating collection: ${collectionName}`);
             await db.createCollection(collectionName);
             console.log('✅ Collection is ready');
         }
         //Ensure Collection Exists by Creating an Index
        await collection.createIndex({ page: 1 }, { unique: true });
        console.log('✅ Collection is ready for page hits');

        // Insert initial document (if it doesn't exist)
        await collection.updateOne(
            { page: 'home' }, 
            { $setOnInsert: { page: 'home', visits: 0 } }, 
            { upsert: true }
        );

        // Increment the counter using $inc
        const updateResult = await collection.updateOne(
            { page: 'home' },    // Find document where page = "home"
            { $inc: { visits: 1 } }  // Increment "visits" by 1
        );

        // Retrieve updated document
        const updatedDoc = await collection.findOne({ page: 'home' });

        console.log(`📈 Page "home" has been visited ${updatedDoc.visits} times`);

        // delete the document if 5 inserts have been made
        if (updatedDoc.visits === 5) {
            console.log('Deleting the home page document');
            await collection.deleteOne({ page: 'home' });
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        // Close MongoDB connection
        await client.close();
        console.log('🔌 MongoDB Disconnected');
    }
}

// Run the function
incrementHitCounter();


/*
await collection.updateOne(...)
await → Waits for MongoDB to complete the update before moving forward.
collection.updateOne(...) → Updates one document in the MongoDB collection.
{ page: 'home' } → Find the document where the page field is equal to 'home'.
{ $inc: { visits: 1 } } → Increment the visits field by 1.
First Argument: { page: 'home' }
This finds the document where "page" is "home".
If there is no matching document, MongoDB will decide whether to insert a new one based on the upsert option.
Second Argument: { $setOnInsert: { page: 'home', visits: 0 } }
MongoDB Update Operator → $setOnInsert
This only runs if the document is inserted (not updated).
If a document with { page: 'home' } already exists, nothing happens here.
If a document with { page: 'home' } does not exist, MongoDB creates a new document:
{ "page": "home", "visits": 0 }
This ensures that if there is no home page record, it is created with visits: 0.
Third Argument: { upsert: true }
This option tells MongoDB to insert a new document if no matching document is found.
upsert: true → Update + Insert
If a document with { page: 'home' } exists, it updates it.
If a document does not exist, it inserts a new one.
Case 1: The Document Already Exists
Database Before Running the Code:
{ "page": "home", "visits": 3 }
The { page: 'home' } document already exists.
Since $setOnInsert only runs when inserting, nothing changes.
Database After Running the Code:
{ "page": "home", "visits": 4 }
 No change. The document was found, so nothing was inserted.
 Case 2: The Document Does NOT Exist
 Database Before Running the Code:
 []   // Empty collection
What Happens?
{ page: 'home' } does not exist.
upsert: true inserts a new document.
$setOnInsert sets { page: "home", visits: 0 }.
Database After Running the Code:
{ "page": "home", "visits": 1 }
The document was inserted with visits: 0.
*/