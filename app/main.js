module.exports = function(server) {
    var prompt = new (require('./models/prompt')),
        users = new (require('./collections/users')),
        io = require('socket.io').listen(server);
    /**
     * Socket.io connection configuration
     * @desc configuration for socket.io connection
     */
    io.sockets.on('connection', function (socket) {
        /**
         * @constant feedback
         * @desc feedback queue for emit/broadcasting
         */
        var feedback = function(user) {
            return {
                question: prompt.get('question') || 'Error',
                players: users.scorable(),
                user: user || null
            };
        };
        /**
         * sendResponse socket
         * @desc conditionalize user response; provide hint or reset prompt with new feedback
         */
        socket.on('sendResponse', function (response) {
            if(!prompt.check(response.answer)) {
                return socket.emit('negative', {hint: prompt.get('hint')});
            }
            prompt.reset();
            var user = users.up(response.user);
            if(user.score < 10) {
                socket.emit('success', feedback(user));
                return socket.broadcast.emit('prompt', feedback(user));
            }
            return io.sockets.emit('gameover', feedback(user));
        });
        /**
         * userJoined socket
         * @desc add user; emit to current user; broadcast user feedback 
         */
        socket.on('userJoined', function(user) {
            user.socket = socket.id;
            users.add(user);
            socket.emit('updateEnvironment', feedback(user));
            socket.broadcast.emit('welcomeUser', feedback(user));
        });
        /**
         * disconnect socket
         * @desc remove user from collection; broadcast user feedback
         */
        socket.on('disconnect', function() {
            var user = users.findWhere({socket: socket.id});
            users.remove(user);
            socket.broadcast.emit('userRemoved', feedback(user));
        });
    });
}