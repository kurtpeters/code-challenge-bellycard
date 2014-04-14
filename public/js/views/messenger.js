define([
    'helpers/messages'
], function(messages) {
    /**
     * @class MessengerView
     * @desc View for bootstrap alerts
     * @type {Object} Backbone.View
     */
    return Backbone.View.extend({
        /**
         * @method className
         * @returns {String}
         */
        className: 'alerts',
        /**
         * @method ModalView
         * @desc add new message/alert template to DOM
         * @returns {Object} MessengerView
         */
        render: function(type, response) {
            this.$el.html(messages[type](response));
            return this;
        }
    });
});