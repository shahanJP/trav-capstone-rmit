


/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();
app.use(express.json());
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('dist'));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

/* Empty JS object to act as endpoint for all routes */

let projectData = {};

app.post('/postData', postData)
function postData(req, res) {
  console.log(req.body);
  projectData = req.body;
  res.send(projectData);
};

// Callback function to complete GET '/all'
app.get('/getData', getData)
function getData (req, res)  {
  res.send(projectData);
  console.log(projectData);
};
app.get('/testEndpoint', async (req, res) => {
  res.json({message: 'The endpoint test passed!'})
})

const port = 8081;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

module.exports = app;