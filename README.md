
# gender-neutral

A node module that neutralizes gender specific text.

## Install

```shell
npm install git://github.com/tobius/gender-neutral.git
```

## Usage

```javascript
// node module
var gender = require('gender-neutral');

// gender specific content
var text = 'I called him on Wednesday to tell him that she laughed at the singing Teddy Bear that he got her. Her eyes were overfilled with joy everytime it said "That is her! That is my new friend!". She really seems to like herself today.';

// neutralize content
gender.neutralize(text, function(err, neutral){
    if (err) throw err;
    else console.log(neutral);
});
```

