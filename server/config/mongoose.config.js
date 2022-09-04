const mongoose = require('mongoose');

//This will create a database named person if one doesn't already exist.
mongoose.connect("mongodb://localhost/scroggswap", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));