const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    
    static async csvToJson(filePath) {
        const content = await readFile(filePath, 'utf-8')
        const validation = this.isValid(content)
        if (!validation.isValid) throw new Error(validation.error)
        return this.parseCsvToJson(content)
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...contents] = csvString.split(/\r?\n/)

        const isValidHeader = header === options.fields.join(',')
        if(!isValidHeader) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                isValid: false
            }
        }

        if (!contents.length || contents.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                isValid: false
            }
        }

        return {
            error: null,
            isValid: true
        }
        
    }

    static parseCsvToJson(csvString) {
        const csvArray = csvString.split(/\r?\n/)
        const header = csvArray.shift().split(',')
        const json = csvArray.map(content => {
            const item = content.split(',')
            const result = {}
            for (const index in item) {

                const key = header[index]
                const value = item[index]

                result[key] = value.trim()
            }
            return result
        })
        return json
    }
}

module.exports = File