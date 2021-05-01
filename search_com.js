function pattern(message ) {
    value =    "/schedule " 
    if( message.length >= 10)
    {
        // is it 
        var pos = 1 ;
        var message_true = "" ; 
        for( var i = 0 ; i < message.length ; i++ )
        {
            if(i < 10)
            {
                if(value[i] != message[i])
                {
                    pos = 0 ;
                    break  ;

                }
            }else
            {
                message_true = message_true  + message[i] ; 

            }

            
        }
        if(pos ==0 )
        return 0 ; 

        // now extract the time 
        message = ""  ;
        time = "" ;
        pos =  1 ;
        for( var i = message_true.length -1 ; i>= 0 ; i-- )
        {
            if( pos )
            {
                if(message_true[i]  == ' ')
                {
                    pos = 0 ;
                }else{
                    time = message_true[i] + time ;  
                }
            }else{
                    message = message_true[i] + message ; 
            }
        }
        
        return 1 ; 
        
    }
    return 0 ; 

    
}
console.log(pattern("/schedule asdsdsa dsa") ) ;