const fs = require('fs')

// функция создания файла со сгенерированными данными
const fileCreation = (numFiles, numStr) => {
    try {

        // проверка введенных данных на клиенте
        if(numFiles <= 0 || numStr <= 0){
            throw new Error('Введите значения больше 0')
        }

        // создание файлов с заданными параметрами
        for (let i = 1; i < numFiles + 1; i++){
            fs.writeFile(`files/file${i}.txt`, generationStr(numStr), (err) => {
                if(err) throw err
            })
        }
        return {message: 'created successfully'}
    } catch (err) {
        return {message: err.message}
    }
}

// функция получения рандомной даты а последние 5 лет
function randomDate(){

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min
    }

    let date1 = new Date('01-01-2015').getTime()
    let date2 = new Date().getTime()

    let randomDate = new Date(getRandomArbitrary(date1, date2))
    let dd = String(randomDate.getDate()).padStart(2, '0')
    let mm = String(randomDate.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = randomDate.getFullYear()

    return today = dd + '.' + mm + '.' + yyyy
}

// генерация случайной строки латинских симолов заданной длины
function randLatinStr(n){  
    let s =''
    while(s.length < n)
      s += String.fromCharCode(Math.random() *127).replace(/\W|\d|_/g,'')
    return s //such as "AujlgLpHLVfDVpNEP"
}

// генерация случайной строки русских симолов заданной длины
function randCyrillicStr(n){  
    let s =''
    while(s.length < n)
      s += String.fromCharCode(Math.random() *1106).replace(/[^а-яА-ЯёЁ]|_/g,'')
    return s //such as "хУэЛГЖХпЫРЙТЪд"
}

// функция получения рандомного Целого числа из заданного диаапазона
function randomInteger(min, max) {

    // случайное число от min до (max+1)
    let rand = Math.floor(min + Math.random() * (max + 1 - min))
    if(!(rand % 2)){
        return rand
    } else {
        return rand + 1
    }
}

// функция получения случайного числа с плавающей точкой 
// в заданном диапазоне с заданным кол-вом символов после запятой
function getRandomFixed(min, max, n) {
    return (Math.random() * (max - min) + min).toFixed(n)
}

// функция генерирования заданного кл-ва строк заданного формата
function generationStr(n) {
    let res =''
    for (let i = 0; i < n; i++){
        res += randomDate() + '||' 
        + randLatinStr(10) + '||' 
        + randCyrillicStr(10) + '||' 
        + randomInteger(1, 100000000) + '||' 
        + getRandomFixed(1, 20, 8) + '||\n'
    }
    return res.slice(0, -1)
}

module.exports = fileCreation