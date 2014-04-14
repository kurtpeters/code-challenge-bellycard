/**
 * @class UsersCollection
 * @desc Collection of users
 * @returns {Object} Backbone.Collection
 */
module.exports = require('backbone').Collection.extend({
    /**
     * @method comparator
     * @desc condition to sort by high score
     */
    comparator: function(a, b) {
        return a.get('score') < b.get('score');
    },
    /**
     * @method up
     * @desc add one to user score
     * @returns {Object}
     */
    up: function(current) {
        var user = this.findWhere(current);
        if(!user) { return null; }
        user.set('score', ++current.score);
        return user.toJSON();
    },
    /**
     * @method scorable
     * @desc resort collection and return cloned attribute set
     * @returns {Object}
     */
    scorable: function() {
        return this.sort().toJSON();
    }
});