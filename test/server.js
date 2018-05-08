var express = require('express');
var app = express();
var port = 9080

app.use(express.static('docs'));
app.use('/test', express.static('docs'));

app.listen(port, function(){
    console.log('Listening on port ' + port);
});