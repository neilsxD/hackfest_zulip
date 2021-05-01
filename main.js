var fs = require('fs');

const zulipInit = require("zulip-js");


// Pass the path to your zuliprc file here.
const config_bot = { zuliprc: "zuliprc" };




function fileCreator(emailId,Key,userId, urls){
    
    // Get the 100 last messages sent by "iago@zulip.com" to the stream "Verona"
    //clientData=await client.messages.retrieve(readParams);
    //console.log(clientData.messages[0].sender_id);
    
    fs.writeFile(userId+'.txt','[api]\nemail='+emailId+'\nkey='+Key +'\nsite=https://'+urls +'.zulipchat.com',
             function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}


async function pattern_register_bot(message_list  ) {
    message = message_list.content ;
    value =    "/register_bot " 
    if( message.length >= value.length)
    {   var pos = 1 ;
        var message_true = "" ; 
        for( var i = 0 ; i < message.length ; i++ )
        {   if(i < value.length )
            {   if(value[i] != message[i])
                {
                    pos = 0 ;
                    break  ;
                }
            }else
            { message_true = message_true  + message[i] ; }
        }
        if(pos ==0 )
        return 0 ; 
        

        // we dont have the time for it 
        //console.log(message_true ) ; 
        fileCreator(message.sender_email , message_true,  message.sender_id , message.sender_realm_str) ; 


        return 1 ; 
        
    }
    return 0 ; 

    
}


var prevMsgData;



function findJson(message,sender_id,type,receiver_id,topic,date_time){

    var text={sender_id:sender_id,receiver_id:receiver_id,message:message,type:type,topic:topic};
    var prevData=[];
    
    fs.readFile(date_time+'.json', function(err, data) {
        if(!err){
            prevData.push(JSON.parse(data)[0]);
        }
        prevData.push(text);
        
        fs.writeFile(date_time+'.json',JSON.stringify(prevData), function (err) {
            if (err) throw err;
            console.log('Saved!');
      });
      
    });
}




// pattern for the /message_schedule
async function pattern_schedule(message_list  ) {
    messagesf = message_list.content ;
    message = messagesf ; 
    // /message_schedule to topic time> <---message--->
    value =    "/message_schedule "  ;
    
    if( message.length >= value.length)
    {   var pos = 1 ;
        var message_true = "" ; 
        for( var i = 0 ; i < message.length ; i++ )
        {   if(i < value.length)
            {   if(value[i] != message[i])
                {
                    pos = 0 ;
                    break  ;
                }
            }else
            { message_true = message_true  + message[i] ; }
        }
        if(pos ==0 )
        return 0 ; 

        
        // /message_schedule
        // now the message will be in form of 
    
        //time to topic  > <--message-->

        console.log(message_true ) ; 
        
        
        var to =""  ; 
        var topic = "" ;
        var space = 0 ; 
        var message_send = "" ;
        var time = "" ;
        for(var itr =  0 ; itr< message_true.length ; itr++  )
        {
            // if it is a space 

            if(space >=4 )
            {
                
                message_send = message_send +  message_true[itr] ; 

            }else
            {

                if(message_true[itr] == ' ')
                    {
                        space++ ; 
                        continue  ;
                    }

                    if(message_true[itr] == '>')
                    {
                        space =4  ;
                        continue ; 
                    }
                    if(space == 1 )
                    {
                        to = to + message_true[itr] ; 

                    }else if(space ==2  )
                    {
                        topic = topic + message_true[itr]  ;
                    }else if(space == 0 )
                    {
                        time = time + message_true[itr] ; 
                    }

                }

             
        }
        var from = message_list.sender_id ; 

        var type = "" ; 

        // SVGAElement_message(message , sender_id , type , receiver_id , topic , date-time)
        if(topic == "")
        type = "private" ; 
        else 
        type = "stream" ; 

        findJson(message , messagesf.sender_id , type  , to , topic , time ) ;
         
/*
        var current = await new Date();
        
        current.setDate = message[0]*10 + message[1] ; 
        current.setmonth = message[4]*10 + message[5] ; 
        current.setyear = message[7]*1000 + message[8]*100 + message[9]*10 + message[10] ; 
        current.sethours = message[12]*10 + message[13] ; 
        current.setminutes = message[15]*10 + message[16] ; 
        
  */    
    }
    
}

var dict = {
    "content": "/message_schedule 11-12-2000-32-23 private-address topic> addsdasasd ",
    "one": 1,
    "sender_id":"sda"
     };
     var dict2 = {
         "content": "/register_bot  addsdasasd ",
         "one": 1,
         "sender_id":"sda" ,
         "sender_mail" : "asads" , 
         "sender_realm_str" :"das" 
          };


    pattern_schedule(dict ) ; 
    pattern_register_bot(dict2) ;





    /*
(async () => {
    const client = await zulipInit(config_bot);


        // check for the message 

        const readParams =  await {
            anchor: "newest",
            num_before: 100,
            num_after: 0,
            narrow: [
                {operator: "sender", operand: "jayantanand123456789@gmail.com"},
                {
                    "operator": "search",
                    "operand": "/message_schedule "
                },
                    ],
        };

        
        const reg_parameter =  await {
            anchor: "newest",
            num_before: 100,
            num_after: 0,
            narrow: [
                {operator: "sender", operand: "jayantanand123456789@gmail.com"},
                {
                    "operator": "search",
                    "operand": "/message_schedule "
                },
                    ],
        };
        


        if(1)
        {
            prevMsgData=await client.messages.retrieve(readParams);
            
            registration =await client.messages.retrieve(reg_parameter);
            
            for( i in registration )
            {
            //    pattern_register_bot(registration) ;
            }
            await console.log(prevMsgData.messages);


            // generate the delay 
            // wait 


        }                
            
})();




*/




