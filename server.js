var express   = require('express');
var path      = require('path');
// var reloader  = require('connect-livereload');

module.exports.run = function(port){
port = port || 9000;
var app = express();

// app.use( reloader() );
app.use( express.static( path.join( './', 'public', 'lib')));
app.use( express.static( path.join( './', 'public', 'dist') ) );
// app.use( express.static( path.join( './', 'demoApp' ) ) );


app.listen(port, function(){
  console.log('Server Listening on PORT', port);
  console.log('Serving demo/index.html');

  console.log('Serving localhost:9000/dist as /');
  console.log('Serving localhost:9000/src as /');
});

  return module.exports.app = app;
};