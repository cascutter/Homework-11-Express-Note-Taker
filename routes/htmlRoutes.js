const path = require("path");

module.exports = app => {

    // Route to notes
    app.get("/notes", function(req, res) {
        console.log("ok");
        res.sendFile(path.join(__dirname, "../Develop/public/notes.html"));
    });

    // Route for index.js
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });
}