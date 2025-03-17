const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'testmongodb';

// Sample Data
const demoPerson = { name: 'John', lastName: 'Smith' };
const findKey = { name: 'John' };

async function main() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('✅ Connected successfully to MongoDB');

        // Select Database & Collection
        const db = client.db(dbName);
        const collection = db.collection('hapsa');

        // Insert a document
        const insertResult = await collection.insertOne(demoPerson);
        console.log('✅ Inserted Document:', insertResult.insertedId);

        // Find the inserted document
        const results = await collection.find(findKey).toArray();
        console.log('🔍 Found Documents:', results);

        // Delete the document
        const deleteResult = await collection.deleteOne(findKey);
        if (deleteResult.deletedCount > 0) {
            console.log('🗑️ Deleted Person Successfully');
        } else {
            console.log('⚠️ No Document Found to Delete');
        }

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        // Close MongoDB Connection
        await client.close();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the function
main();
