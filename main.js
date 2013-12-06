
var _ = require('underscore'),
    async = require('async'),
    fs = require('fs'),
    natural = require('natural'),
    request = require('request');

var inflector = new natural.NounInflector(),
    wordnet = new natural.WordNet();

var gender = module.exports = {

    /**
     * specific gender neutral patterns
     *
     * @var {Object}
     * @name patterns
     */
    patterns: {
        nominativeSubject    : /\b(he|she)\b/gi,
        obliqueObject        : /\b(him|her)\b/gi,
        possessiveDeterminer : /\b(his|her)\b/gi,
        possessivePronoun    : /\b(his|hers)\b/gi,
        reflexive            : /\b(himself|herself)\b/gi
    },

    /**
     * various gender neutral filters
     *
     * @var {Object}
     * @name filters
     */
    filters: {
        they: {
            nominativeSubject    : 'they',
            obliqueObject        : 'them',
            possessiveDeterminer : 'their',
            possessivePronoun    : 'theirs',
            reflexive            : 'themself'
        },
        e: {
            nominativeSubject    : 'e',
            obliqueObject        : 'em',
            possessiveDeterminer : 'eir',
            possessivePronoun    : 'eirs',
            reflexive            : 'eirself'
        },
        ey: {
            nominativeSubject    : 'ey',
            obliqueObject        : 'em',
            possessiveDeterminer : 'eir',
            possessivePronoun    : 'eirs',
            reflexive            : 'emself'
        },
        tho: {
            nominativeSubject    : 'tho',
            obliqueObject        : 'thor',
            possessiveDeterminer : 'thors',
            possessivePronoun    : 'thor',
            reflexive            : 'thongself'
        },
        hu: {
            nominativeSubject    : 'hu',
            obliqueObject        : 'hum',
            possessiveDeterminer : 'hus',
            possessivePronoun    : 'hus',
            reflexive            : 'humself'
        },
        per: {
            nominativeSubject    : 'per',
            obliqueObject        : 'per',
            possessiveDeterminer : 'per',
            possessivePronoun    : 'pers',
            reflexive            : 'perself'
        },
        thon: {
            nominativeSubject    : 'thon',
            obliqueObject        : 'thon',
            possessiveDeterminer : 'thons',
            possessivePronoun    : 'thons',
            reflexive            : 'thonself'
        },
        jee: {
            nominativeSubject    : 'jee',
            obliqueObject        : 'jem',
            possessiveDeterminer : 'jeir',
            possessivePronoun    : 'jeirs',
            reflexive            : 'jemself'
        },
        ve: {
            nominativeSubject    : 've',
            obliqueObject        : 'ver',
            possessiveDeterminer : 'vis',
            possessivePronoun    : 'vis',
            reflexive            : 'verself'
        },
        xe: {
            nominativeSubject    : 'xe',
            obliqueObject        : 'xem',
            possessiveDeterminer : 'xyr',
            possessivePronoun    : 'xyrs',
            reflexive            : 'xemself'
        },
        ze: {
            nominativeSubject    : 'ze',
            obliqueObject        : 'mer',
            possessiveDeterminer : 'zer',
            possessivePronoun    : 'zers',
            reflexive            : 'zemself'
        },
        zhe: {
            nominativeSubject    : 'zhe',
            obliqueObject        : 'zhim',
            possessiveDeterminer : 'zher',
            possessivePronoun    : 'zhers',
            reflexive            : 'zhimself'
        }
    },

    /**
     * perform a safe regexp replacement that preserves capitalization
     *
     * @param {String} text
     * @param {RegExp} find
     * @param {String} replace
     */
    safeReplace: function(text, find, replace){

        text = text.replace(find, function(match, specific){
            if (/[A-Z]/.test(specific.substring(0, 1))){
                return replace.charAt(0).toUpperCase() + replace.substring(1);
            }
            return replace;
        });
        return text;

    },

    /**
     * determine if a word could be a noun
     *
     * @param {String} word
     * @param {Function} callback({String} err, {Boolean} result)
     */
    /*
    isPossibleNoun: function(word, callback){

        var possible = false;

        word = inflector.singularize(word);

        if (word){

            wordnet.lookup(word, function(results){
                for (var i = results.length - 1; i > -1; i -= 1){
                    if (results[i].pos === 'n'){
                        possible = true;
                    }
                }
                callback(undefined, possible);
            });

        } else {

            callback('unable to identify word: ' + word);

        }

    },
    */

    /**
     * neutralize gender specific nominative subjects
     *
     * example: He/She laughed
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralizeNominativeSubjects: function(text, callback){

        var filter, past, present;

        // terms
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';
        text = this.safeReplace(text, this.patterns.nominativeSubject, this.filters[filter].nominativeSubject);

        // tense
        past = new RegExp('\\b(' + this.filters[filter].nominativeSubject + ') +was\\b', 'i');
        present = new RegExp('\\b(' + this.filters[filter].nominativeSubject + ') +is\\b', 'i');
        text = text.replace(past, '$1 were');
        text = text.replace(present, '$1 are');

        // finish
        callback(undefined, text);

    },

    /**
     * neutralize gender specific oblique objects
     *
     * example: I called him/her
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralizeObliqueObjects: function(text, callback){

        var filter;

        // terms
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';
        text = this.safeReplace(text, this.patterns.obliqueObject, this.filters[filter].obliqueObject);

        // finish
        callback(undefined, text);

    },

    /**
     * neutralize gender specific possessive determiners
     *
     * example: His/Her eyes gleam
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralizePossessiveDeterminers: function(text, callback){

        var filter;

        // terms
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';
        text = this.safeReplace(text, this.patterns.possessiveDeterminer, this.filters[filter].possessiveDeterminer);

        // finish
        callback(undefined, text);

    },

    /**
     * neutralize gender specific possessive pronouns
     *
     * example: That is his/hers
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralizePossessivePronouns: function(text, callback){

        var filter;

        // terms
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';
        text = this.safeReplace(text, this.patterns.possessivePronoun, this.filters[filter].possessivePronoun);

        // finish
        callback(undefined, text);

    },

    /**
     * neutralize gender specific reflexives
     *
     * example: He/She likes himself/herself
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralizeReflexives: function(text, callback){

        var filter;

        // terms
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';
        text = this.safeReplace(text, this.patterns.reflexive, this.filters[filter].reflexive);

        // finish
        callback(undefined, text);

    },

    /**
     * neutralize gender specific pronouns
     *
     * @param {String} text
     * @param {Function} callback({String} err, {String} text)
     * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
     */
    neutralize: function(text, callback){

        var delegate, filter;

        delegate = this;
        filter = (arguments > 2 && filters[arguments[2]] !== undefined) ? arguments[2] : 'they';

        async.waterfall([
            function(callback){ delegate.neutralizeNominativeSubjects(text, callback); },
            function(text, callback){ delegate.neutralizeObliqueObjects(text, callback); },
            function(text, callback){ delegate.neutralizePossessiveDeterminers(text, callback); },
            function(text, callback){ delegate.neutralizePossessivePronouns(text, callback); },
            function(text, callback){ delegate.neutralizeReflexives(text, callback); },
        ], callback);

    }

};

