const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

app.use((bodyParser.urlencoded({extended: false})));

const sessionId = uuid.v4(); //by this we can use followback intents...

app.use(express.json());

app.use(bodyParser.json())

app.post( '/ctbot',  async (req, res) => {
    // console.log(req.body);
    runSample(req.body.userquery).then( data => {
        res.send({Rpely: data});
    });

});


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(userquery, projectId = 'ct-i-intent-suux') {
  // A unique identifier for the given session
  //const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
      keyFilename: "/Users/HemantSharma/Desktop/ct-i-intent-suux-bb1fefe71289.json"   // location of key file ...
  });
  const sessionPath = sessionClient.sessionPath(
    projectId,
    sessionId
  );   //here use:   projectAgentSessionPath()   =====>    sessopnpath()    //error:-   sessionClient.projectAgentSessionPath is not a function

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        // text: ' learn abpout node',
        text: userquery,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }

  return result.fulfillmentText;
}

//runSample();

const PORT = 11000;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})