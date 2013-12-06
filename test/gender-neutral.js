
var assert, chai, gender, withGender, withoutGender;

chai = require('chai');
gender = require('../main');

chai.Assertion.stackTrace = true;

assert = chai.assert;

describe('require("gender-neutral")', function(){

    describe('gender.neutralizeNominativeSubjects(text, callback, [type])', function(){
        it('should return neutralized nominative subjects for gender specific statement', function(done){
            var text = 'She solved the problem by combining the proper solvents according to the prescribed ratio.';
            gender.neutralizeNominativeSubjects(text, function(err, neutral){
                assert(neutral === 'They solved the problem by combining the proper solvents according to the prescribed ratio.', neutral);
                done();
            }, 'they');
        });
    });

    describe('gender.neutralizeObliqueObjects(text, callback, [type])', function(){
        it('should return neutralized oblique objects for gender specific statements', function(done){
            var text = 'I spoke to him that morning and told him that the fervor quotient was the way to go.';
            gender.neutralizeObliqueObjects(text, function(err, neutral){
                assert(neutral === 'I spoke to them that morning and told them that the fervor quotient was the way to go.', neutral);
                done();
            }, 'they');
        });
    });

    describe('gender.neutralizePossessiveDeterminers(text, callback, [type])', function(){
        it('should return neutralized possessive determiners for gender specific statements', function(done){
            var text = 'His back was so freaking wide that he looked like the Hulk from the rear.';
            gender.neutralizePossessiveDeterminers(text, function(err, neutral){
                assert(neutral === 'Their back was so freaking wide that he looked like the Hulk from the rear.', neutral);
                done();
            }, 'they');
        });
    });

    describe('gender.neutralizePossessivePronouns(text, callback, [type])', function(){
        it('should return neutralized possessive pronouns for gender specific statements', function(done){
            var text = 'I took the toy away from him and told him that it was hers and that he was not to touch it again.';
            gender.neutralizePossessivePronouns(text, function(err, neutral){
                assert(neutral === 'I took the toy away from him and told him that it was theirs and that he was not to touch it again.', neutral);
                done();
            }, 'they');
        });
    });

    describe('gender.neutralizeReflexives(text, callback, [type])', function(){
        it('should return neutralized reflexives for gender specific statements', function(done){
            var text = 'She looked into the mirror and admired herself every morning ... she loved being a Mermaid.';
            gender.neutralizeReflexives(text, function(err, neutral){
                assert(neutral === 'She looked into the mirror and admired themself every morning ... she loved being a Mermaid.', neutral);
                done();
            }, 'they');
        });
    });

    describe('gender.neutralize(text, callback, [type])', function(){
        it('should return neutralized text for gender specific statements', function(done){
            var text = 'I called him on Wednesday to tell him that she laughed at the singing Teddy Bear that he got her. Her eyes were overfilled with joy everytime it said "That is her! That is my new friend!". She really seems to like herself today.';
            gender.neutralizeReflexives(text, function(err, neutral){
                assert(neutral === 'I called them on Wednesday to tell them that they laughed at the singing Teddy Bear that they got her. Their eyes were overfilled with joy everytime it said "That is them! That is my new friend!". They really seemed to like themself today.', neutral);
                done();
            }, 'they');
        });
    });

});

