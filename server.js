// Adds required dependencies
const express = require("express");
const path = require("path");

// Sets port 
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up data parsing and route middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));

// Accesses route files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Adds listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});



