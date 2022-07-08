# extract-jsdoc-language
Extract the description of a particular language from jsdoc written in multiple languages.


[jsdoc example]

sourceDir/doc.js
```js
/**
 * $i18n{ko:숫자를 반환한다.문자는 반환오류가 됨.,en:return number. number error}
 * @param {number} a - $i18n{ko:숫자,en:Number}
 * @returns {number}
 */
 function num(a) {
    return a;
}
```

[execution]
`node exportLang.js -l ko`


[result]

destDir/en/doc.js
```js
/**
 * return number. number error
 * @param {number} a - Number
 * @returns {number}
 */
 function num(a) {
    return a;
}
```
