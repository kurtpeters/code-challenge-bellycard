define([
    'templates/leaderboard'
], function(template) {
    'use strict';
    /**
     * @class LeaderboardView
     * @desc View for individual user object
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
        id: 'leaderboard',
        /**
         * @method className
         * @returns {String}
         */
        className: 'section white',
        /**
         * @method render
         * @desc reconstruct leaderboard with new template
         * @returns {Object} LeaderboardView
         */
        render: function(response) {
            this.$el.html(template(response));
            return this;
        }
    });
});