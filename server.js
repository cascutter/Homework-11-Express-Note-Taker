// Adds required dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets port 
const app = express();
const PORT = process.env.PORT || 8080;
const main = path.join(__dirname, "/public");

// Sets up data parsing and route middleware
app.use(express.static(path.join(__dirname, "/db")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Adds listener
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});

// Accesses route files
//require("./routes")(app);

app.get("/notes", function(req, res) {
    res.sendFile(path.join(main, "/notes.html"));
});


// Route for api
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
})

// Route for index.js
app.get("*", function(req, res) {
    res.sendFile(path.join(main, "/index.html"));
});

// Assigns ID to note
app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteId = (savedNotes.length).toString();
    newNote.id = noteId;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log(`Note saved! Id ${noteId}. Content:`, newNote);
    res.json(savedNotes);
})

// Deletes note based on id
app.delete("api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Note ${noteId} deleted.`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteId;
    })

    for (currNote of savedNotes) {
        currNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});




