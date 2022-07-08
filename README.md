# extract-jsdoc-language
Extract the description of a particular language from jsdoc written in multiple languages.


- jsdoc example

> sourceDir/doc.js
```js
/**
 * $i18n{ko:숫자를 반환한다.,en:return the number.}
 * @param {number} a - $i18n{ko:숫자,en:A number}
 * @returns {number}
 */
 function num(a) {
    return a;
}
```



- execution

`node exportLang.js -l en`
`node exportLang.js -l ko`



- result
> destDir/ko/doc.js
    
```js
/**
 * 숫자를 반환한다.
 * @param {number} a - 숫자
 * @returns {number}
 */
 function num(a) {
    return a;
}
```
> destDir/en/docs.js
    
```js
/**
 * return the number.
 * @param {number} a - A number
 * @returns {number}
 */
 function num(a) {
    return a;
}
```
