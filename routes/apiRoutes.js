// Modules required
const express = require("express");
const path = require("path");
const fs = require("fs");


module.exports = app => {

    app.use(express.static(path.join(__dirname, "Develop/db")));
    app.use(express.static(path.join(__dirname, "Develop/public")));

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    
    app.get("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        res.json(savedNotes[Number(req.params.id)]);
    })

    // Assigns ID to note
    app.post("/api/notes", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        let newNote = req.body;
        let noteId = (savedNotes.length).toString();
        newNote.id = noteId;
        savedNotes.push(newNote);

        fs.writeFileSync("../db/db.json", JSON.stringify(savedNotes));
        console.log(`Note saved! Id ${noteId}. Content:`, newNote);
        res.json(savedNotes);
    })
    // Deletes note based on id
    app.delete("api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
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
    });
}

