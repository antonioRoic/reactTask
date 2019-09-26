const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST form

app.post('/create', function(req, res) {
  const newForm = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Address: req.body.address,
    Phone: req.body.phone,
    Email: req.body.email
  };

// Write text

  let path = 'form.txt';
  let buffer = new Buffer(JSON.stringify(newForm));

  fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'Could not open file: ' + err;
    }

    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'Error writing file: ' + err;
        fs.close(fd, function() {
            console.log('Wrote the file successfully in reacttask folder!');
        });
    });
  });
});

// Server

app.listen(3001, () => {
  console.log('Server Listening on port 3001');
});
