var fs = require('fs');

function DeleteFile(date_time){
    //console.log(date_time);
    fs.unlink(date_time+'.json', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
}

