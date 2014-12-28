var express   = require('express');
var path      = require('path');

module.exports.run = function(port){
port = port || 9000;
var app = express();

app.use( express.static( path.join( './', 'public', 'lib')));
app.use( express.static( path.join( './', 'public', 'dist') ) );

app.listen(port, function(){
  console.log('Server Listening on PORT', port);
});

  return module.exports.app = app;
};