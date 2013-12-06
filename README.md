
# gender-neutral

A node module that neutralizes gender specific text.

## Install

```shell
npm install git://github.com/tobius/gender-neutral.git
```

## Usage

```javascript
var gender = require('gender-neutral');

var text = 'I called him on Wednesday to tell him that she laughed at the singing Teddy Bear that he got her. Her eyes were overfilled with joy everytime it said "That is her! That is my new friend!". She really seems to like herself today.';

gender.neutralize(text, function(err, neutral){
    if (err) throw err;
    else console.log(neutral);
});
```

