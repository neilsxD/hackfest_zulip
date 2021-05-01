const zulipInit = require("zulip-js");
var fs = require('fs');
// Pass the path to your zuliprc file here.
const config = { zuliprc: "zuliprc" };

function fileCreator(emailId,Key,userId){
    
    fs.writeFile(userId+'.txt','[api]\nemail='+emailId+'\nkey='+Key+'\nsite=https://'+clientData.messages[0].sender_realm_str+'.zulipchat.com',
             function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}


//var clientData;

/*function generateKey(sender_email,stream,Key){
    //console.log(sender_email);
    (async () => {
        const client = await zulipInit(config);
    
        const readParams = {
            anchor: "newest",
            num_before: 100,
            num_after: 0,
            narrow: [
                {operator: "sender", operand: sender_email},
                {operator: "stream", operand: stream},
            ],
        };
        clientData=await client.messages.retrieve(readParams);
        fileCreator(clientData.messages[0].sender_email,Key,clientData.messages[0].sender_id);
       
    })();
}*/