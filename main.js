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


function pattern_register_bot(message_list) {
    message = extractContent(message_list.content) ;
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
        fileCreator(message_list.sender_email , message_true,  message_list.sender_id , message_list.sender_realm_str) ; 


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




// pattern for the message_schedule
 function pattern_schedule(message_list  ) {
   // console.log(message_list) ; 

    messagesf = extractContent(message_list.content) ;
    message = messagesf ; 
    //console.log(message) ; 

    // message_schedule to topic time> <---message--->
    value =    "message_schedule "  ;
    
    if( message.length >= value.length)
    {   var pos = 1 ;
        var message_true = "" ; 
        for( var i = 0 ; i < message.length ; i++ )
        {   if(i < value.length)
            {   if(value[i] != message[i])
                {
                    
                    //console.log(value[i]) ;

                    pos = 0 ;
                    break  ;
                }
            }else
            { message_true = message_true  + message[i] ; }
        }

        if(pos ==0 )
        return 0 ; 

        
        // message_schedule
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

        findJson(message_send , message_list.sender_id , type  ,message_list.recipient_id , topic , time ) ;
        
    }
    
}


var fs = require('fs');

function ReadJsonFile(fileName){
    //console.log(fileName);
    fs.readFile(fileName, function(err, data) {
            if(err) return 0 ;
            var fileData=JSON.parse(data);
            return  fileData; 
            var len=fileData.length;
            
            for(var i=0;i<len;i++){
                console.log(fileData[i].message);
            }
      });
}

function time_checker() {
        var current =  new Date();
        // dd-mm-yyyy-mm-hh
        var dd = current.getDate() ; 
        var mm = current.getMonth() ; 
        var yyyy = current.getFullYear() ; 
        var hh = current.getHours() ; 
        var mi  = current.getMinutes() ; 
        
        var location =  "" ;
        if( (dd+"").length == 1)
        {
            location = location + "0" +dd +'-'; 
        }else 
        {
            location = location +dd +'-' ; 
            
        }

        if( (mm + "" ).length == 1)
        {
            location = location + "0" +mm +'-'; 
        }else 
        {
            location = location +mm +'-' ; 
            
        }
        
        location = location + yyyy +'-' ;
        
        if( (hh+ "").length == 1)
        {
            location = location + "0" +hh +'-'; 
        }else 
        {
            location = location +hh +'-' ; 
            
        }
        if( (mi +"").length == 1)
        {
            location = location + "0" +mi; 
        }else 
        {
            location = location +mi ; 
            
        }
         
        location = location +".json"   ;
        console.log(location ) ;
        ReadJsonFile(location ) ;
        
        
}






time_checker() ; 














var dict = {
    "content": "message_schedule 11-12-2000-32-23 private-address topic> addsdasasd ",
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


    //pattern_schedule(dict ) ; 
    //pattern_register_bot(dict2) ;

    const { htmlToText } = require('html-to-text');
    
    function extractContent(content){
        const text = htmlToText(content, {
            wordwrap: null
            });
            
           return text;
    }



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
                    "operand": "message_schedule "
                },
                    ],
        };

        
        const reg_parameter =  await {
            anchor: "newest",
            num_before: 100,
            num_after: 0,
            narrow: [
                {operator: "sender", operand: "jayantanand123456789@gmail.com"}],
        };
        


        if(1)
        {
            prevMsgData=await client.messages.retrieve(readParams);
            registration =await client.messages.retrieve(reg_parameter);
           // console.log(registration.messages);
            for( var i=0;i<registration.messages.length;i++)
            {
                pattern_register_bot(registration.messages[i]) ;
            }
            for(var i = 0 ; i < prevMsgData.messages.length  ; i++ )
            {
                pattern_schedule(prevMsgData.messages[i])  ;

    //   pattern_schedule(prevMsgData.messages[i]) ; 
            }
            
//            await console.log(prevMsgData.messages);


            // generate the delay 
            // wait 


        }                
            
})();








*/
