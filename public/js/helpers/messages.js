define([
    'templates/messenger/congrats',
    'templates/messenger/gameover',
    'templates/messenger/goodbye',
    'templates/messenger/missed',
    'templates/messenger/newChallenger',
    'templates/messenger/thunderdome',
    'templates/messenger/wrongAnswer'
], function(congrats, gameover, goodbye, missed, newChallenger, thunderdome, wrongAnswer) {
    /**
     * @namespace templates
     * @desc messenger alerts template queue
     * @type {Object}
     */
    return {
        congrats: congrats,
        gameover: gameover,
        goodbye: goodbye,
        missed: missed,
        newChallenger: newChallenger,
        thunderdome: thunderdome,
        wrongAnswer: wrongAnswer,
    };
});