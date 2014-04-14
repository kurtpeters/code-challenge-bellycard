var express = require('express'),
    app = express();
/**
 * Application Configuration
 * @desc express app configuration
 */
app.configure(function() {
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');
    // App middleware
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use('/vendor', express.static(__dirname + '/vendor'));
    app.use(function(req, res) {
        res.status(404).redirect('https://bellycard.com/404');
    });
});
/**
 * Application Routes
 * @desc application routes
 */
app.get('/', function(req, res) {
    res.render('index');
});
/**
 * Server
 * @desc application port
 */
var server = app.listen(1337, function() {
    require('./app/main')(server);
    console.log('Listening on port %d', server.address().port);
});