(function() {
    return this.config({
        /**
         * @desc requirejs configuration setup
         */
        baseUrl: 'js',
        paths: {
            'handlebars': '../../vendor/handlebars/hbs.runtime.amd',
            'templates': '../dist/templates'
        }
    })([
        'models/user',
        'views/modal', 'views/prompt', 'views/leaderboard', 'views/messenger',
        'helpers/sockets',
    ], function(User, Modal, Prompt, Leaderboard, Messenger, Sockets) {
        'use strict';
        /**
         * @class ApplicationView
         * @desc Initialization of product
         * @type {Object} new Backbone.View
         */
        return new (Backbone.View.extend({
            /**
             * @method initialize
             * @desc initialize sockets/user; create user listeners; update user object
             * @returns {Object} ApplicationView
             */
            initialize: function() {
                this.sockets = new Sockets(this);
                this.user = new User();
                this.listenToOnce(this.user, 'falseStorage', this.getInformation)
                    .listenTo(this.user, 'ready', this.render);
                this.user.update();
                return this;
            },
            /**
             * @method render
             * @desc initialize messenger/prompt/leaderboard; create prompt listener; add DOM elements; emit to user socket
             * @returns {Object} ApplicationView
             */
            render: function(username) {
                this.messenger = new Messenger();
                this.prompt = new Prompt();
                this.listenTo(this.prompt, 'sendResponse', this.sendResponse);
                this.leaderboard = new Leaderboard();
                this.$el.html([this.messenger.el, this.prompt.el, this.leaderboard.el]);
                this.sockets.addUser(this.user.set(username).toJSON());
                return this;
            },
            /**
             * @method getInformation
             * @desc 
             * @returns {Object} ApplicationView
             */
            getInformation: function() {
                this.modal = new Modal();
                return this.listenTo(this.modal, 'collected', function(response) {
                    this.user.set(response).trigger('ready');
                });
            },
            /**
             * @method sendResponse
             * @desc trigger socket event with user input from prompt
             * @returns {Object} ApplicationView
             */
            sendResponse: function(answer) {
                this.sockets.sendResponse({
                    answer: answer,
                    user: this.user.toJSON()
                });
                return this;
            },
            /**
             * @method reset
             * @desc reset local environment; update user
             * @returns {Object} ApplicationView
             */
            reset: function(response, render) {
                render||(render={});
                if(render.prompt) { this.prompt.render(response); }
                if(render.leaderboard) { this.leaderboard.render(response); }
                if(render.user) { this.user.set(response.user); }
                if(render.notify) { this.messenger.render(render.notify, response); }
                return this;
            },
            /**
             * @method gameover
             * @desc reset local environment; reset user
             * @returns {Object} ApplicationView
             */
            gameover: function(response) {
                this.prompt.close(response);
                this.leaderboard.render(response);
                this.user.set('score', 0);
                this.messenger.render('gameover', response);
                return this;
            }
        }))({el: '#main'});
    });
}).apply(require);