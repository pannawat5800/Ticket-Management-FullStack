const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require('./src/core/mongodb.core');
const ApiRoute = require('./src/routes/route');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Success Contected.")
});

// console.log("database url: ", process.env.DB_URI);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', ApiRoute);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})