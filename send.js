function send(message , sender_id , type , receiver_id , topic = null ){
    const config_id = { zuliprc: sender_id }; // the document will be in the form of the sender id
    let params = {} ; 
    if(type == 'private' )
    {
        params = {
            to: [receiver_id],
            type: "private",
            content: message ,
        };

    }else {
        params = {
            to: receiver_id  ,
            type: "stream",
            topic: topic,
            content: message,
        };

    }

    console.log(await client.messages.send(params));

}


function filter_messages(message )
{

}