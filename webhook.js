const dialogflow = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
//const uuid = require('uuid');
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

app.use((bodyParser.urlencoded({extended: false})));

//const sessionId = uuid.v4(); //by this we can use followback intents...

app.use(express.json());

app.use(bodyParser.json());



app.post( '/ctbot/webhook',  async (req, res) => {
      console.log(req.body);
    const _agent = new WebhookClient({request: req, response: res});    //this will connection between webook and node ...

    function ct_i_reply(agent){
        if(_agent.intent === "Ct-I-Intents-Fulfillment-I" ){
            return agent.add('We have flutter modules for learning');
        }
        return agent.add('you have to learn about dart language first');
    }

    let intents = new Map(); 

    intents.set('Ct-I-Intents-Fulfillment-I', ct_i_reply);         //set the reply according to their intents...
    intents.set('Ct-I-Intents-Fulfillment-II', ct_i_reply);

    _agent.handleRequest(intents);      //handlling the request between agent of dialogflow and webhook.... 

});

const PORT = 12000;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
