const zulipInit = require("zulip-js");


async function sends(message , sender_id , type , receiver_id , topic = null ){
    
    const config_id = await { zuliprc: sender_id}; // the document will be in the form of the sender id
    const client = await   zulipInit(config_id);


    let params = {} ; 
    if(type == 'private' )
    {
        params = {
            to: [receiver_id],
            type: "private",
            content: message ,
        };
        console.log(await client.messages.send(params));

    


    }else {



        params = {
            to: receiver_id  ,
            type: "stream",
            topic: topic,
            content: message,
        };
        
     console.log(await client.messages.send(params));


    }




}


async function time_checker()
{
    var current = await new Date();
    var time_det=  current.set   
    console.log(current.getTime()) ;

}
(async () => {
   await  sends("asd" ,"download" , "stream"  , "test_bot-bot" , "sd" ) ;
time_checker()  ;

})() ;



