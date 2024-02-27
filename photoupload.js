const fs = require('fs');
const { MongoClient } = require('mongodb');

async function uploadImage(imagePath, description) {
    const uri = 'mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB!');

        const database = client.db('mortex');
        const collection = database.collection('image');


        const imageBuffer = fs.readFileSync(imagePath);


        const imageDocument = {
            description: description,
            image: imageBuffer,
        };

        const result = await collection.insertOne(imageDocument);
        console.log('Image added with ID:', result.insertedId);
    } catch (err) {
        console.error('Error uploading image to MongoDB:', err);
    } finally {
        client.close();
    }
}


const imagePath = 'accessories.jpg';
const imageDescription = 'accessories for woman and man';





uploadImage(imagePath, imageDescription);
