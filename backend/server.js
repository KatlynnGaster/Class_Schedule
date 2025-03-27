const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8787;
const fs = require('fs');

// Middleware
app.use(cors());
app.use(bodyParser.json());

//fetches from the database.json
app.get('/csr', (req, res) => {
    try {
        const data = fs.readFileSync('./database.json', 'utf-8')
        const classes = JSON.parse(data);
        res.json({ entries: classes });
    } catch (error) {
        console.error("Error reading from database JSON:", error);
        res.status(500).send({ success: false, message: "Failed to fetch classes"});
    }
});

app.post('/csr', (req, res) => {
    try {
        const newClass = req.body; // Get new class data from request
        const data = fs.readFileSync('./database.json', 'utf-8'); // Read current data
        const classes = JSON.parse(data); // Parse JSON data
        classes.push(newClass); // Add the new class to the array
        fs.writeFileSync('./database.json', JSON.stringify(classes, null, 2)); // Write updated data back to file
        res.status(201).send({ success: true, message: "Class added successfully!" });
    } catch (error) {
        console.error("Error writing to classes JSON file:", error);
        res.status(500).send({ success: false, message: "Failed to add class" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});