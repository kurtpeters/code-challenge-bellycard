define([
    'templates/prompt',
    'templates/winner'
], function(promptTemplate, winnerTemplate) {
    'use strict';
    /**
     * @class PromptView
     * @desc View for user prompt
     * @type {Object} Backbone.View
     */
    return Backbone.View.extend({
        /**
         * @method tagName
         * @returns {String}
         */
        tagName: 'section',
        /**
         * @method id
         * @returns {String}
         */
        id: 'user-prompt',
        /**
         * @method className
         * @returns {String}
         */
        className: 'section',
        /**
         * @method events
         * @returns {Object}
         */
        events: {
            'click .send': 'sendResponse',
            'click .restart': 'restartPrompt'
        },
        /**
         * @method render
         * @desc add prompt to DOM; set focus to input child el
         * @returns {Object} ModalView
         */
        render: function(response) {
            this.$el.html(promptTemplate(response));
            this.$('.answer').focus();
        },
        /**
         * @method sendResponse
         * @desc trigger socket event; build user input argument
         * @returns {Object} PromptView
         */
        sendResponse: function(e) {
            e.preventDefault();
            return this.trigger('sendResponse', this.$('.answer').val());
        },
        /**
         * @method close
         * @desc replace current prompt with gameover content
         * @returns {Object} PromptView
         */
        close: function(response) {
            this.$el.html(winnerTemplate(response));
            return this;
        },
        /**
         * @method restartPrompt
         * @desc reload window location
         * @returns {Object} PromptView
         */
        restartPrompt: function() {
            location.reload();
            return this;
        }
    });
});