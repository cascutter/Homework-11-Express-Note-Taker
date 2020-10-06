// Adds required dependencies
const path = require("path");
const fs = require("fs");

module.exports = app => {
    // Sets up note variable
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err) throw err;
    
        let notes = JSON.parse(data);

    // Set up API route to get data and returns saved notes
    app.get("/api/notes", function(req, res) {
        res.JSON(notes);
    });
    
    // Sets up API route to post data
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Added new note: " + newNote.title);
    });
    
    // Retrives note based on id
    app.get("/api/notes/:id", function(req, res) {
        res.JSON(notes[req.params.id]);
    });

    // Deletes note based on id
    app.delete("api/notes/:id", function(req, res) {
        let id = req.params.id.toString();
        console.log(id);
        for (let i = 0; i < notes.length; i++) {
            if(notesData[i].id == id) {
                console.log("Match")
                res.send(notes[i]);
                notesData.splice(i, 1);
                break;
            };   
        };
    });

    // Updates JSON
    function updateDb() {
        fs.writeFileSync("./db/db.json", JSON.stringify(notes, "\t"), err => {
            if(err) throw(err);
            return true;
        });
    }

});

}
