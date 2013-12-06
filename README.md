
# gender-neutral

A node module that neutralizes gender specific text.

## Install

```shell
[~] npm install git://github.com/tobius/gender-neutral.git
```

## Usage

```javascript
// node module
var gender = require('gender-neutral');

// gender specific content
var text = 'I called him on Wednesday to tell him the good news.';

// neutralize content
gender.neutralize(text, function(err, neutral){
    if (err) throw err;
    else console.log(neutral);
    // outputs:
    // I called them on Wednesday to tell them the good news.';
});
```

## Supported Filters

Each filter replaces references to nominative subjects, oblique objects,
possessive determiners, possessive pronouns, and reflexives.

filter      | nominative subject    | oblique object    | possessive determiner | possessive pronoun    | reflexive
---         | ---                   | ---               | ---                   | ---                   | ---
__they__    | they  | them  | their | theirs    | themself
__e__       | e     | em    | eir   | eirs      | eirself
__ey__      | ey    | em    | eir   | eirs      | emself
__tho__     | tho   | thor  | thors | thor      | thongself
__hu__      | hu    | hum   | hus   | hus       | humself
__per__     | per   | per   | per   | pers      | perself
__thon__    | thon  | thon  | thons | thons     | thonself
__jee__     | jee   | jem   | jeir  | jeirs     | jemself
__ve__      | ve    | ver   | vis   | vis       | verself
__xe__      | xe    | xem   | xyr   | xyrs      | xemself
__ze__      | ze    | mer   | zer   | zers      | zemself
__zhe__     | zhe   | zhim  | zher  | zhers     | zhimself

