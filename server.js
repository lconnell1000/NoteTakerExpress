const express = require('express');
const path = require('path');
const fs = require('fs');

let IdNum = 0;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });


app.post("/api/notes", (req, res) => {
    let noteRequest = req.body;
    let notes = JSON.parse(fs.readFileSync("./db/db.josn", "utf-8"))
    IdNum = IdNum +1;

    const newNote = {
        id: IdNum, title: noteRequest.title, text: noteRequest.text
    };

    notes.push(newNote)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.josn", "utf-8"))
    let noteId = req.params.id.toString();

    notes = notes.filter((data) => {
        return data.id != noteId
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));