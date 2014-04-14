define([], function() {
    var socketIo = io.connect(),    
    /**
     * @class Sockets
     * @desc Object for structuring socket events
     * @type {Function|Object} Sockets
     */
    Sockets = function(controller) {
        /**
         * @desc listener for when game has ended
         */
        socketIo.on('gameover', function(response) {
            return controller.gameover(response);
        });
        /**
         * @desc listener for when current user answers incorrectly
         */
        socketIo.on('negative', function(response) {
            return controller.reset(response, {
                notify: 'wrongAnswer'
            });
        });
        /**
         * @desc listener for when another user has answered the quesiton correctly
         */
        socketIo.on('prompt', function(response) {
            return controller.reset(response, {
                prompt: true,
                leaderboard: true,
                notify: 'missed'
            });
        });
        /**
         * @desc listener for when current user answers correctly
         */
        socketIo.on('success', function(response) {
            return controller.reset(response, {
                prompt: true,
                leaderboard: true,
                user: true,
                notify: 'congrats'
            });
        });
        /**
         * @desc listener for when another user has left the game
         */
        socketIo.on('userRemoved', function(response) {
            return controller.reset(response, {
                leaderboard: true,
                notify: 'goodbye'
            });
        });
        /**
         * @desc listener for initializing user environment
         */
        socketIo.on('updateEnvironment', function(response) {
            return controller.reset(response, {
                prompt: true,
                leaderboard: true,
                user: true,
                notify: 'thunderdome'
            });
        });
        /**
         * @desc listenr for when another user has entered the game
         */
        socketIo.on('welcomeUser', function(response) {
            return controller.reset(response, {
                leaderboard: true,
                notify: 'newChallenger'
            });
        });
        return this;
    };
    /**
     * @method addUser
     * @desc emit/notify of new user being added
     * @returns {Object} Sockets
     * @type {Function}
     */
    Sockets.prototype.addUser = function(response) {
        socketIo.emit('userJoined', response);
        return this;
    };
    /**
     * @method sendResponse
     * @desc emit/evaluate prompt response
     * @returns {Object} Sockets
     * @type {Function}
     */
    Sockets.prototype.sendResponse = function(response) {
        socketIo.emit('sendResponse', response);
        return this;
    };
    return Sockets;
});