const fs = require('fs')

// функция конкатенации файлов из директории в один 
// с удаление строк с заданной подстрокой
// c выводом информации о количесве удаленных строках

const concatFiles = (substr, filename) => {

    // инициализация переменных 
    var totalDeleted = 0
    let textFromFile = ''
    const folder = 'files/'

    // считывание каждого файла из дирекотрии files
    try {
        fs.readdirSync(folder).forEach(file => {

            // для каждого файла считывание данных
            let data = fs.readFileSync(folder + file)
            let array = data.toString().split("\n")
            let len1 = array.length
            
            // удаление строк с заданной подстрокой
            let result = array.filter(item => {
                if(!(item.indexOf(substr) + 1)) {
                    return item
                }
            })

            // определение кол-ва удаленных строк из каждого файла
            totalDeleted += len1 - result.length
    
            // формироваие новых данных для конкатенации
            result.forEach(str => {
                textFromFile += (str + '\n')
            })
    
            // запись сконкатенированных данных в файл 
            fs.appendFileSync(`concatFiles/${filename}.txt`, textFromFile)
    
            result.length = 0
            textFromFile = ''
        })
        return {message: `${totalDeleted} строк удалено с подстрокой ${substr}`}   
    } catch (error){
        return {message: err.message}
    }
}

module.exports = concatFiles