const { MongoClient } = require('mongodb');

// MongoDB Connection URL & Database Name
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'googlehit';
const collectionName = 'websites';

// Define the document to insert
const website = { 
    url: 'http://www.google.com', 
    visits: 0 
};

// Define the search key
const findKey = { 
    url: 'http://www.google.com' 
};

async function main() {
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 🟢 Ensure the collection exists
        const collections = await db.listCollections({ name: collectionName }).toArray();
        if (collections.length === 0) {
            console.log(`⚡ Creating collection: ${collectionName}`);
            await db.createCollection(collectionName);
        }

        // 🟢 Insert the initial website document
        const existing = await collection.findOne(findKey);
        if (!existing) {
            await collection.insertOne(website);
            console.log('✅ Inserted new website document.');
        }

        // Increment visits using $inc
        const incrementVisits = { $inc: { visits: 1 } };
        let done = 0;

        function onDone() {
            done++;
            if (done < 4) return; // Wait for all updates to complete
            
            collection.findOne(findKey).then(result => {
                console.log('📊 Total Visits:', result.visits); // Should print 4
                
                // 🧹 Cleanup: Drop collection & close connection
                collection.drop(() => client.close());
                console.log('🔌 Connection closed.');
            });
        }

        // 🟢 Update visits 4 times asynchronously
        await collection.updateOne(findKey, incrementVisits);
        onDone();
        await collection.updateOne(findKey, incrementVisits);
        onDone();
        await collection.updateOne(findKey, incrementVisits);
        onDone();
        await collection.updateOne(findKey, incrementVisits);
        onDone();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// Run the function
main();
