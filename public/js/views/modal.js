define([
    'templates/modal'
], function(template) {
    /**
     * @class ModalView
     * @desc View for sign-on modal
     * @type {Object} Backbone.View
     */
    return Backbone.View.extend({
        /**
         * @method className
         * @returns {String}
         */
        className: 'modal fade',
        /**
         * @method events
         * @returns {Object}
         */
        events: {
            'click .btn': 'collect'
        },
        /**
         * @method initialize
         * @desc create listener events for bootstrap modal; render class
         * @returns {Object} ModalView
         */
        initialize: function() {
            var self = this;
            this.$el.on('shown.bs.modal', function (e) {
                self.$('.input').focus();
            }).on('hide.bs.modal', function (e) {
                $('body').removeClass('modalized');
            }).on('hidden.bs.modal', function (e) {
                self.$el.remove();
            });
            return this.render();
        },
        /**
         * @method render
         * @desc add modal to DOM; trigger bootstrap modal
         * @returns {Object} ModalView
         */
        render: function() {
            $('body').addClass('modalized').append(this.$el.append(template()));
            this.$el.modal({ backdrop: 'static', show: true });
            return this;
        },
        /**
         * @method collect
         * @desc hide bootstrap modal; trigger collected modal event and pass input value argument
         * @returns {Object} ModalView
         */
        collect: function(e) {
            e.preventDefault(); var value;
            if(!(value = this.$('.input').val())) { return; }
            this.$el.modal('hide');
            return this.trigger('collected', {name: value});
        }
    });
});