// import the library
const express = require("express");
const characters = require("./characters.json");

// define PORT for the server to run
const PORT = 4000;

// create the server
const app = express();

// Waits for GET requests
// 2 params to create the endpoint
// 1. the endpoint url
// 2. the handler => what to do when a request comes in
// full address: 'http://localhost:4000/students'
app.get("/helloworld", (request, response) => {
  console.log("hello i got a request!", {
    type: request.method,
    when: new Date(),
  });

  response.send("I got the message");
});

app.get("/characters", (request, response) => {
  // what do we do in this route?
  console.log("I got a request for the characters!");
  response.send(characters);
});

// an endpoint with a PARAMETER
// /characters/10
// /characters/14556
// /characters/hello
app.get("/characters/:charId", (request, response) => {
  console.log("what is request.params?", request.params);

  const charId = parseInt(request.params.charId);

  const theCharacter = characters.find((c) => c.id === charId);

  if (!theCharacter) {
    response.status(404).send(`No character with that id: ${charId}`);
  }

  response.send(theCharacter);
});

app.get("/characters/species/:type", (request, response) => {
  // 1. Get `specie` from request.params
  const species = request.params.type;
  // 2. .filter
  const filteredChar = characters.filter((c) => c.species === species);
  // 3. respond
  response.send(filteredChar);
});

// in every endpoint, in the route handler,
// i have the `request` (that just came in)
// and the `response` (an object to answer back)

// start the server
app.listen(PORT, () => console.log("Server running!!"));
