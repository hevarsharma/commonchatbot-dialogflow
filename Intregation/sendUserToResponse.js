const dialogflow = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
//const mySqlConnection = require('./config/dbConfig');
const mysql = require('mysql');

const dbConfig = require('./config/dbConfig');

exports.response = (req, res) => {

    const _agent = new WebhookClient({ request: req, response: res });    //this will connection between webook and node ...

    function ct_i_reply(agent) {

        if (_agent.intent === "Ct-I-Intents-Fulfillment-I") {
            return agent.add('We have flutter modules for learning'); //fulfillment test condition
        }
        // else if (_agent.intent === "Ct-Faq-QA-I") {
        //     return agent.add(" Celebal Technologies is a premier software services company in the field of Data Science, Big Data, and Enterprise Cloud. Our team of technology experts are here to help you achieve a competitive advantage with intelligent data solutions, built using cutting-edge technology. We helped fortune 1000 companies leverage their data by combining modern analytics with the traditional enterprise. Celebal Technologies started its journey in 2016 by providing Data and Analytics solutions to Enterprises. We started with 4 employees. We have leaders from different fields and expertise having 20+ years of expertise in Enterprise solutions. ");
        // }//bot test condition
        return agent.add('Ask me anything related your queries'); //default condition
    }

    // async function handleReadFromMySQL(agent) {
    //     const connection = await dbConfig.connectToDatabase();
    //     const result_1 = await dbConfig.queryDatabase(connection, 'SELECT * FROM dialogflowusers');
    //     console.log(result_1);
    //     agent.add(result_1[0].FirstName);
    // }

    let intents = new Map();

    intents.set('Ct-I-Intents-Fulfillment-I', ct_i_reply);         //set the reply according to their intents...
    intents.set('Ct-I-Intents-Fulfillment-II', ct_i_reply);
    //intents.set('Ct-Faq-QA-I', ct_i_reply);
    //intents.set('getDataFromMySql', handleReadFromMySQL);

    _agent.handleRequest(intents);      //handlling the request between agent of dialogflow and webhook.... 

}