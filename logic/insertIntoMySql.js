const fs = require('fs')
const csvtojson = require('csvtojson')
const mysql = require("mysql")
const config = require('config')


// функция создания копии .txt файла в формате .csv
// для удобного импорта в базу данных
function convertToCsv(fileTXT) {

    // строка заголовков для .csv файла
    res = 'DATE,LATIN,CYRILLIC,NUM_INT,NUM_POINT\n'

    // преобразование данных из текстового файла к формату .csv
    let array = fs.readFileSync(fileTXT).toString().split("\n")
    for (let i = 0; i < array.length; i++){
        array[i] = array[i].replace(/\|\|/gi, ',').slice(0, -1)
        res += array[i] + '\n'
    }

    // запись полученных данных в .cs файл
    fs.writeFile(`csv/file1.csv`, res.slice(0, -1), (err) => {
        if(err) throw err
    })
}


// импортирование файла в базу данных 
const insertIntoMysql = (filename) => {
    
    // подтягивание настроек для соединения с базой из конфигурационного файла
    const HOSTNAME = config.get('hostname') || 'localhost'
    const USERNAME = config.get('username') || 'root'
    const PASSWORD = config.get('password') || 'root'
    const DBNAME = config.get('databasename') || 'task1'
    
    try{
        let con = mysql.createConnection({ 
            host: HOSTNAME, 
            user: USERNAME, 
            password: PASSWORD, 
            database: DBNAME, 
        }) 

        // подключение к базе
        con.connect(err => console.log(err))
    
        // преобразование екстового файла к формату .csv
        convertToCsv(`files/${filename}`)
        csvtojson().fromFile('csv/file1.csv').then(source => { 
      
            // Fetching the data from each row  
            // and inserting to the table "sample" 
            for (let i = 0; i < source.length; i++) { 
                const DATE = source[i]["DATE"], 
                    LATIN = source[i]["LATIN"], 
                    CYRILLIC = source[i]["CYRILLIC"], 
                    NUM_INT = source[i]["NUM_INT"],
                    NUM_POINT = source[i]["NUM_POINT"]
          
                // sql - запрос для вставки данных в таблицу в базу данных
                const insertStatement =  
                `INSERT INTO strings (DATE
                                    ,LATIN
                                    ,CYRILLIC
                                    ,NUM_INT
                                    ,NUM_POINT) values(?, ?, ?, ?, ?);`

                // параметры для запроса
                const items = [DATE, LATIN, CYRILLIC, NUM_INT, NUM_POINT]
          
                // Inserting data of current row 
                // into database 
                con.query(insertStatement, items,  
                    (err, results, fields) => { 
                    if(err){
                        return console.log(err)
                    }
                })
                console.log('Загружено: ', i + 1, ' из ', source.length )
            } 
        })
        return {message: 'Импорт завершился успешно'}
    } catch (e) {
        return {error: e.message}
    }
}

module.exports = insertIntoMysql

