const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); //Allows JSON objects to be posted
app.use(express.urlencoded({extended: true})); //Allows JSON objects with strings and arrays

//Importing the Routes' export
// require('./routes/crypto.routes')(app); 
//Importing the Mongoose Config
// require('./config/mongoose.config');

app.listen(port, () => console.log(`Listening on port: ${port}`));