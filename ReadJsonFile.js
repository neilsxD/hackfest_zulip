var fs = require('fs');

function ReadJsonFile(fileName){
    //console.log(fileName);
    fs.readFile(fileName, function(err, data) {
            if(err) throw err;
            var fileData=JSON.parse(data);
            var len=fileData.length;
            for(var i=0;i<len;i++){
                console.log(fileData[i].message);
            }
      });
}
