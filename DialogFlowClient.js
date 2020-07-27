const dialogFlow=require('@google-cloud/dialogflow');
const uuid=require('uuid');
const express=require('express');

const struct=require('pb-util');

const app=express();
async function fetchAgent(projectId='meeting-scheduler-1620'){
  try
  { 
    const sessionId=uuid.v4();
    const sessionClient=new dialogFlow.SessionsClient();
    console.log('project id',projectId);
    const sessionPath=sessionClient.projectAgentSessionPath(projectId,sessionId);
    console.log(sessionPath);
    const request={
        session:sessionPath,
        queryInput:{
            text:{
                text:'Hi',
                languageCode:'en_US'
            }
        }
    };
    
    const response=await sessionClient.detectIntent(request);
    console.log('intent detected');
    const result=response[0].queryResult;
    console.log('Query',result.queryText);
    console.log('Response',result.fulfillmentText);
    if (result.intent) {
        
      } else {
        console.log(`  No intent matched.`);
      }
    }
    catch(e)
    {
        console.log(e);
    }
}

app.listen(9001,()=>{
    console.log('server is running on port 9001')
})

fetchAgent();

