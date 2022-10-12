const chai = require('chai');
const gender = require('../main');

chai.Assertion.stackTrace = true;

const { assert } = chai;

describe('require("gender-neutral")', () => {

  describe('gender.neutralizeNominativeSubjects(text, [type])', () => {
    it('should return neutralized nominative subjects for gender specific statement', () => {
      const text = 'She solved the problem by combining the proper solvents according to the prescribed ratio.';
      const neutral = gender.neutralizeNominativeSubjects(text, 'they');
      assert(neutral === 'They solved the problem by combining the proper solvents according to the prescribed ratio.');
    });
  });

  describe('gender.neutralizeObliqueObjects(text, [type])', () => {
    it('should return neutralized oblique objects for gender specific statements', () => {
      const text = 'I spoke to him that morning and told him that the fervor quotient was the way to go.';
      const neutral = gender.neutralizeObliqueObjects(text, 'they');
      assert(neutral === 'I spoke to them that morning and told them that the fervor quotient was the way to go.');
    });
  });

  describe('gender.neutralizePossessiveDeterminers(text, [type])', () => {
    it('should return neutralized possessive determiners for gender specific statements', () => {
      const text = 'His back was so freaking wide that he looked like the Hulk from the rear.';
      const neutral = gender.neutralizePossessiveDeterminers(text, 'they');
      assert(neutral === 'Their back was so freaking wide that he looked like the Hulk from the rear.');
    });
  });

  describe('gender.neutralizePossessivePronouns(text, [type])', () => {
    it('should return neutralized possessive pronouns for gender specific statements', () => {
      const text = 'I took the toy away from him and told him that it was hers and that he was not to touch it again.';
      const neutral = gender.neutralizePossessivePronouns(text, 'they');
      assert(neutral === 'I took the toy away from him and told him that it was theirs and that he was not to touch it again.');
    });
  });

  describe('gender.neutralizeReflexives(text, [type])', () => {
    it('should return neutralized reflexives for gender specific statements', () => {
      const text = 'She looked into the mirror and admired herself every morning ... she loved being a Mermaid.';
      const neutral = gender.neutralizeReflexives(text, 'they');
      assert(neutral === 'She looked into the mirror and admired themself every morning ... she loved being a Mermaid.');
    });
  });

  describe('gender.neutralize(text, [type])', () => {
    it('should return neutralized text for gender specific statements', () => {
      const text = 'I called him on Wednesday to tell him that she laughed at the singing Teddy Bear that he got her. Her eyes were overfilled with joy everytime it said "That is her! That is my new friend!". She really seems to like herself today.';
      const neutral = gender.neutralize(text, 'they');
      assert(neutral === 'I called them on Wednesday to tell them that they laughed at the singing Teddy Bear that they got them. Their eyes were overfilled with joy everytime it said "That is them! That is my new friend!". They really seemed to like themself today.');
    });
  });
});
