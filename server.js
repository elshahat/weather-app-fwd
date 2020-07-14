const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const projectData = {}

app.get('/all', getAllData);
function getAllData(req, res) {
   res.send(projectData);
}

app.post('/add', addData);
function addData(req, res) {
   projectData['date'] = req.body.date;
   projectData['temp'] = req.body.temp;
   projectData['content'] = req.body.content;

   res.send(projectData);
}

const port = 8000;
const server = app.listen(port, listening);

function listening() {
   console.log("server running");
   console.log(`running on localhost: ${port}`);
}
