/**
 * @class PromptModel
 * @desc Model for generating prompt/question data
 * @returns {Object} Backbone.Model
 */
module.exports = require('backbone').Model.extend({
    /**
     * @method defaults
     * @desc default attributes for model
     */
    defaults: {
        answer  : null, //{String} - Answer for current quesiton
        hint    : null, //{String} - Reformated question
        numbers : null, //{Object} - Randomized numbers for question to handle
        question: null  //{String} - Client prompt value
    },
    /**
     * @method initialize
     * @desc initialize a reset
     * @returns {Object} PromptModel
     */
    initialize: function() {
        return this.reset();
    },
    /**
     * @method reset
     * @desc reset numbers attribute and randomize prompt type
     * @returns {Object} PromptModel
     */
    reset: function(times) {
        var numbers = []; times||(times=2);
        for(times; times > 0; times--) { 
            numbers.push(Math.floor(Math.random()*100));
        }
        return this.set({numbers: numbers})[this.randomize()]();
    },
    /**
     * @method randomize
     * @desc return string type of add or subtract
     * @returns {String} type
     */
    randomize: function() {
        var type = ['add', 'subtract'];
        return type[Math.floor(Math.random()*type.length)];
    },
    /**
     * @method check
     * @desc conditional for user response being equal to current answer attribute
     * @returns {Boolean} correct?
     */
    check: function(answer) {
        return answer.toString() === this.get('answer').toString();
    },
    /**
     * @method add
     * @desc add method type
     * @returns {Object} PromptModel
     */
    add: function() {
        var numbers = this.get('numbers');
        return this.set({
            answer  : numbers[0] + numbers[1],
            hint    : numbers[0] +' + '+ numbers[1] + ' = ?',
            question: 'What is the <strong>sum</strong> of <strong>'+ numbers[0] +'</strong> and <strong>'+ numbers[1] +'</strong>?'
        });
    },
    /**
     * @method subtract
     * @desc subtract method type
     * @returns {Object} PromptModel
     */
    subtract: function() {
        var numbers = this.get('numbers');
        return this.set({
            answer  : numbers[0] - numbers[1],
            hint    : numbers[0] +' - '+ numbers[1] + ' = ?',
            question: 'What is the <strong>difference</strong> between <strong>'+ numbers[0] +'</strong> and <strong>'+ numbers[1] +'</strong>?'
        });
    }
});