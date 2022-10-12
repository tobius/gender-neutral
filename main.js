// modules
const async = require('async');

// object
const gender = {
  /**
   * specific gender neutral patterns
   *
   * @var {Object}
   * @name patterns
   */
  patterns: {
    nominativeSubject: /\b(he|she)\b/gi,
    obliqueObject: /\b(him|her)\b/gi,
    possessiveDeterminer: /\b(his|her)\b/gi,
    possessivePronoun: /\b(his|hers)\b/gi,
    reflexive: /\b(himself|herself)\b/gi,
  },

  /**
   * various gender neutral filters
   *
   * @var {Object}
   * @name filters
   */
  filters: {
    e: {
      nominativeSubject: 'e',
      obliqueObject: 'em',
      possessiveDeterminer: 'eir',
      possessivePronoun: 'eirs',
      reflexive: 'eirself',
    },
    ey: {
      nominativeSubject: 'ey',
      obliqueObject: 'em',
      possessiveDeterminer: 'eir',
      possessivePronoun: 'eirs',
      reflexive: 'emself',
    },
    hu: {
      nominativeSubject: 'hu',
      obliqueObject: 'hum',
      possessiveDeterminer: 'hus',
      possessivePronoun: 'hus',
      reflexive: 'humself',
    },
    jee: {
      nominativeSubject: 'jee',
      obliqueObject: 'jem',
      possessiveDeterminer: 'jeir',
      possessivePronoun: 'jeirs',
      reflexive: 'jemself',
    },
    per: {
      nominativeSubject: 'per',
      obliqueObject: 'per',
      possessiveDeterminer: 'per',
      possessivePronoun: 'pers',
      reflexive: 'perself',
    },
    they: {
      nominativeSubject: 'they',
      obliqueObject: 'them',
      possessiveDeterminer: 'their',
      possessivePronoun: 'theirs',
      reflexive: 'themself',
    },
    tho: {
      nominativeSubject: 'tho',
      obliqueObject: 'thor',
      possessiveDeterminer: 'thors',
      possessivePronoun: 'thor',
      reflexive: 'thongself',
    },
    thon: {
      nominativeSubject: 'thon',
      obliqueObject: 'thon',
      possessiveDeterminer: 'thons',
      possessivePronoun: 'thons',
      reflexive: 'thonself',
    },
    ve: {
      nominativeSubject: 've',
      obliqueObject: 'ver',
      possessiveDeterminer: 'vis',
      possessivePronoun: 'vis',
      reflexive: 'verself',
    },
    xe: {
      nominativeSubject: 'xe',
      obliqueObject: 'xem',
      possessiveDeterminer: 'xyr',
      possessivePronoun: 'xyrs',
      reflexive: 'xemself',
    },
    ze: {
      nominativeSubject: 'ze',
      obliqueObject: 'mer',
      possessiveDeterminer: 'zer',
      possessivePronoun: 'zers',
      reflexive: 'zemself',
    },
    zhe: {
      nominativeSubject: 'zhe',
      obliqueObject: 'zhim',
      possessiveDeterminer: 'zher',
      possessivePronoun: 'zhers',
      reflexive: 'zhimself',
    },
  },

  /**
   * perform a safe regexp replacement that preserves capitalization
   *
   * @param {String} text
   * @param {RegExp} find
   * @param {String} replace
   */
  safeReplace(text, find, replace) {
    return text.replace(find, (match, specific) => {
      if (/[A-Z]/.test(specific.substring(0, 1))) {
        return replace.charAt(0).toUpperCase() + replace.substring(1);
      }
      return replace;
    });
  },

  /**
   * neutralize gender specific nominative subjects
   *
   * example: He/She laughed
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralizeNominativeSubjects(text, filter = 'they') {
    let neutralText = this.safeReplace(
      text,
      this.patterns.nominativeSubject,
      this.filters[filter].nominativeSubject,
    );

    // tense
    // @todo doesn't this logic belong in the possessive test?
    const past = new RegExp(`\\b(${this.filters[filter].nominativeSubject}) +was\\b`, 'i');
    const present = new RegExp(`\\b(${this.filters[filter].nominativeSubject}) +is\\b`, 'i');
    neutralText = this.safeReplace(neutralText, past, '$1 were');
    neutralText = this.safeReplace(neutralText, present, '$1 are');

    // finish
    return neutralText;
  },

  /**
   * neutralize gender specific oblique objects
   *
   * example: I called him/her
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralizeObliqueObjects(text, filter = 'they') {
    return this.safeReplace(
      text,
      this.patterns.obliqueObject,
      this.filters[filter].obliqueObject,
    );
  },

  /**
   * neutralize gender specific possessive determiners
   *
   * example: His/Her eyes gleam
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralizePossessiveDeterminers(text, filter) {
    return this.safeReplace(
      text,
      this.patterns.possessiveDeterminer,
      this.filters[filter].possessiveDeterminer,
    );
  },

  /**
   * neutralize gender specific possessive pronouns
   *
   * example: That is his/hers
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralizePossessivePronouns(text, filter = 'they') {
    return this.safeReplace(
      text,
      this.patterns.possessivePronoun,
      this.filters[filter].possessivePronoun,
    );
  },

  /**
   * neutralize gender specific reflexives
   *
   * example: He/She likes himself/herself
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralizeReflexives(text, filter = 'they') {
    return this.safeReplace(
      text,
      this.patterns.reflexive,
      this.filters[filter].reflexive,
    );
  },

  /**
   * neutralize gender specific pronouns
   *
   * @param {String} text
   * @param {String} [filter=they] (they|e|ey|tho|hu|per|thon|jee|ve|xe|ze|zhe)
   */
  neutralize(text, filter = 'they') {
    let neutralizedText;
    neutralizedText = this.neutralizeNominativeSubjects(text, filter);
    neutralizedText = this.neutralizeObliqueObjects(text, filter);
    neutralizedText = this.neutralizePossessiveDeterminers(text, filter);
    neutralizedText = this.neutralizePossessivePronouns(text, filter);
    neutralizedText = this.neutralizeReflexives(text, filter);
    return neutralizedText;
  },
};

// export
module.exports = gender;
