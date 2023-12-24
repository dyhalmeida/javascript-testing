const assert = require('assert')
const File = require("./src/file")
const { error } = require('./src/constants')

;(async () => {
    
    /**
     * It: Should throw an exception error that the file content size is invalid 
     * (header only, no content)
     */
    {
        const filePath = './mocks/empty-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    /**
     * It: Should throw an exception error stating that the file header is invalid
     */
    {
        const filePath = './mocks/invalid-header.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    /**
     * It: Should throw an exception error stating that the quantity 
     * of items is invalid
     */
    {
        const filePath = './mocks/invalid-items.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    /**
     * It: Should return valid JSON
     */
    {
        const filePath = './mocks/valid-items.csv'
        const expected = [
            {
              "id": 1,
              "name": "Luke",
              "profession": "Padawan Jedi",
              "age": 30
            },
            {
              "id": 2,
              "name": "Anakin",
              "profession": "Jedi",
              "age": 35
            },
            {
              "id": 3,
              "name": "Yoda",
              "profession": "Mestre Jedi",
              "age": 300
            }
          ]
          
        const result = await File.csvToJson(filePath)
        await assert.deepEqual(result, expected)
    }

})()