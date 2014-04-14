define([], function() {
    'use strict';
    /**
     * @class UserModel
     * @desc Individual user object
     * @type {Object} Backbone.Model
     */
    return Backbone.Model.extend({
        /**
         * @method defaults
         * @returns {Object}
         */
        defaults: {
            score: 0,
            streak: 0
        },
        /**
         * @method initialize
         * @desc initializing user; setting listerns; checking for sessionStorage compatibility 
         * @returns {Object} UserModel
         */
        initialize: function() {
            this.storageMarker = 'bellyCodingChallenge';
            this.on('change:score', this.update, this);
            if(!Modernizr.sessionstorage) {
                this.update = $.proxy(this.trigger, this, 'falseStorage');
            }
            return this;
        },
        /**
         * @method update
         * @desc updating attribute queue with sessionStorage; populating sessionStorage
         * @returns {Object} UserModel
         */
        update: function(model) {
            if(model) {
                sessionStorage.setItem(this.storageMarker, JSON.stringify(this.toJSON()));
                return this;
            }
            var storage = $.parseJSON(sessionStorage.getItem(this.storageMarker));
            if(!storage) { return this.trigger('falseStorage'); }
            return this.set(storage).trigger('ready');
        }
    });
});