const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://ilcodimeski85:20061985Ile.@cluster0.iy2htxi.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/products/category-link', (req, res) => {
    res.render('category');
});

app.post('/contact', async (req, res) => {
    const collection = client.db("mongodb").collection("contacts");
    const contact = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    };
    try {
        const result = await collection.insertOne(contact);
        console.log(`Contact inserted with the _id: ${result.insertedId}`);
    } catch (err) {
        console.log(err);
    }
    res.redirect('/'); // or wherever you want to redirect the user after form submission
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    // Start the express server
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
