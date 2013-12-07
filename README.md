
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

// "they" >> I called them on Wednesday to tell them the good news.
gender.neutralize(text, console.log);

// "zhe" >> I called zhim on Wednesday to tell zhim the good news.
gender.neutralize(text, console.log, 'zhe');
```

## Supported Filters

&nbsp;          | nominative<br/>(subject) | oblique<br/>(object) | possessive<br/>determiner | possessive<br/>pronoun | reflexive
---             | ---           | ---               | ---               | ---               | ---
_male gender_   | _he_ laughed  | I called _him_    | _His_ eyes gleam  | That is _his_     | He likes _himself_
_female gender_ | _she_ laughed | I called _her_    | _Her_ eyes gleam  | That is _hers_    | She likes _herself_
__they__        | they      | them      | their         | theirs    | themself
__e__           | e         | em        | eir           | eirs      | eirself
__ey__          | ey        | em        | eir           | eirs      | emself
__tho__         | tho       | thor      | thors         | thor      | thongself
__hu__          | hu        | hum       | hus           | hus       | humself
__per__         | per       | per       | per           | pers      | perself
__thon__        | thon      | thon      | thons         | thons     | thonself
__jee__         | jee       | jem       | jeir          | jeirs     | jemself
__ve__          | ve        | ver       | vis           | vis       | verself
__xe__          | xe        | xem       | xyr           | xyrs      | xemself
__ze__          | ze        | mer       | zer           | zers      | zemself
__zhe__         | zhe       | zhim      | zher          | zhers     | zhimself

