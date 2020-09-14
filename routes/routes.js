const {Router} = require('express')
const router = Router()
const fileCreation = require('../logic/fileCreation')
const concat = require('../logic/concat')
const insertIntoMysql = require('../logic/insertIntoMySql')
const path = require("path")

// route /api/main/generate
// генерирование заданного кол-ва файлов с заданным кол-вом стрк
router.post('/generate', async (req, res) => {
    try {

        // данные отправленные с клиента
        const {numFiles, numStr} = req.body

        const result = fileCreation(+numFiles, +numStr)
        res.status(201).json({message: result.message})

    } catch (e) {
        res.status(500).json({error : e.message})
    }
})

// route /api/main/concat
// конкатенация файлов из директории в один с удалением строк с указанной подстрокой
router.post('/concat', async(req, res) => {
    try {

        // данные с клиента
        const {substr, filename} = req.body

        const result = concat(substr, filename)
        res.status(201).json({message: result.message})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

// route /api/main/import
// импотирование файла в базу данных 
router.post('/import', async(req, res) => {
    try {

        // данные с кдиента
        const {filename} = req.body

        const file = path.basename(filename)
        const result = insertIntoMysql(file)
        res.status(201).json({message: result.message})
    } catch(e){
        res.status(500).json({error: e.message})
    }
    
})

module.exports = router