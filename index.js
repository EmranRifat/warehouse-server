
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middelware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t9ksv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() { 

    try {

        // await client.connect();
        const serviceWare = client.db('wareHosue').collection('services');

        app.get('/service', async (req, res) => {
                const query = {};
                const cursor = serviceWare.find(query);
                const service = await cursor.toArray();
                res.send(service);
            });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceWare.findOne(query);
            res.send(service);
        });

        // post
        app.post('/service', async (req, res) => {

            const newCard = req.body;
            // console.log(newCard);
            const result = await serviceWare.insertOne(newCard);
            res.send(result);

        })

        // delete 
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceWare.deleteOne(query);
            res.send(result);

        });


        // update
        app.put('/service/:id', async (req, res) => {
            console.log(req.body);
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    quantity: updatedProduct.updatedQuentity
                }
            }
            const result = await serviceWare.updateOne(filter, updatedInfo, options);
            res.send(result);
        })

    }


    finally {



    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running My server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})
// git push heroku main