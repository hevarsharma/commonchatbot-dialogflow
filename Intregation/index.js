const express = require('express');
const app = express(); 

const bodyParser = require('body-parser');

app.use((bodyParser.urlencoded({extended: false})));

app.use(express.json());

app.use(bodyParser.json());

const sendUserQuery = require('./sendUserQuery');
const sendUserToResponse = require('./sendUserToResponse');


//function which which get the user query and then match by avialable intents and then send the response.
//these reponses created by "sendUserToResponse.response" function.
app.post( '/ctbot/query',  async (req, res) => {

    sendUserQuery.runSample(req.body.userquery).then( data => {
        res.send({Reply: data});
    });

});


//function which create response by ourself using webhook as internally; 
//means=> Here we are responsible for the responses rather then inside dialogflow responses.
// we just have to give ngrok to dialogflow (fulfillment) for a pipeline so that our reponses working properly 
app.post( '/ctbot/webhook/response',  async (req, res) => {

    sendUserToResponse.response(req, res);

});

const PORT = 13000;
app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`)
})