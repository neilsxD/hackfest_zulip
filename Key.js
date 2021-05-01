const zulipInit = require("zulip-js");
var fs = require('fs');
// Pass the path to your zuliprc file here.
const config = { zuliprc: "zuliprc" };
var clientData,Key;
(async () => {
    const client = await zulipInit(config);

    const readParams = {
        anchor: "newest",
        num_before: 100,
        num_after: 0,
        narrow: [
            {operator: "sender", operand: "Jayantanand123456789@gmail.com"},
            {operator: "stream", operand: "test_bot-bot"},
        ],
    };
    clientData=await client.messages.retrieve(readParams);
    fileCreator(clientData.messages[0].sender_email,Key,clientData.messages[0].sender_id);
   
})();

function fileCreator(emailId,Key,userId){
    
    // Get the 100 last messages sent by "iago@zulip.com" to the stream "Verona"
    //clientData=await client.messages.retrieve(readParams);
    //console.log(clientData.messages[0].sender_id);
    
    fs.writeFile(userId+'.txt','[api]\nemail='+emailId+'\nsite=https://'+clientData.messages[0].sender_realm_str+'.zulipchat.com',
             function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}