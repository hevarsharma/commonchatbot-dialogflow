const dialogflow = require('dialogflow');
const uuid = require('uuid');

const sessionId = uuid.v4(); //by this we can use followback intents...


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */


exports.runSample = async (userquery, projectId = 'ct-i-intent-suux') => {

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "/Users/HemantSharma/Desktop/ct-i-intent-suux-bb1fefe71289.json"   // location of key file ...
    });
    const sessionPath = sessionClient.sessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userquery,
                languageCode: 'en-US',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    if (result.fulfillmentText === "") {

        if(result.fulfillmentMessages[1]){

            if (result.fulfillmentMessages[1].payload.fields.card) {
                console.log(`  Intent: ${result.intent.displayName}`);
    
                let card = [];
                cardElementList = result.fulfillmentMessages[1].payload.fields.card.listValue.values;
    
                for (let i = 0; i < cardElementList.length; i++) {
                    card.push(cardElementList[i].stringValue);
                }
    
                return { "card": card };
            }
    
            else if (result.fulfillmentMessages[1].payload.fields.link) {
                console.log(`  Intent: ${result.intent.displayName}`);
                
                let obj = {
                    "text": result.fulfillmentMessages[1].payload.fields.link.structValue.fields.text.stringValue,
                    "url": result.fulfillmentMessages[1].payload.fields.link.structValue.fields.url.stringValue
                }
    
                return {"link":obj};
            }

        }

    }

    else if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        return { "text": result.fulfillmentText };
    }

    else {
        console.log('  No intent matched.');
        return { message: "No intent matched" };
    }

}

