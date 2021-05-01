var fs = require('fs');

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

//findJson('Hello',123,'private',456,'Castle','01-05-2021_2016');
