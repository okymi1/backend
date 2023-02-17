const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();
const port = 3000;
const API_URL = "http://localhost:3000";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/candidate', (req, res) => {
  const { firstName, lastName, email, description } = req.body;
  if (req.files && req.files.cv) {
    const cv = req.files.cv;
    cv.mv(`./uploads/${cv.name}`);
  }
  const newCandidate = { firstName, lastName, email, description };

  if (req.files && req.files.cv) {
    newCandidate.cv = req.files.cv.name;
  }
  const candidateData = JSON.stringify(newCandidate);
  fs.writeFileSync('candidate.json', candidateData);

  res.status(200).send('Informations du candidat enregistrées avec succès');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
