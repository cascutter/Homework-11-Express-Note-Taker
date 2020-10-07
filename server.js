// Adds required dependencies
const express = require("express");
const path = require("path");

// Sets port 
const app = express();
const PORT = process.env.PORT || 8080;
const main = path.join(__dirname, "/public");

// Sets up data parsing and route middleware
app.use(express.static(path.join(__dirname, "Develop/db")));
app.use(express.static(path.join(__dirname, "Develop/public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Accesses route files
require("./routes")(app);

// Adds listener
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});



