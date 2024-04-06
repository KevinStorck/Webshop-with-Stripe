const fs = require("fs").promises

const generateId = (arr) => {
    let newId;
    const generateNewId = () => newId = Math.floor(Math.random() * 100000000)
    generateNewId()
    let found = arr.find(i => i.id === newId)
    while (found) {
        generateNewId()
        found = arr.find(i => i.id === newId)
    }
    return newId
}

module.exports = generateId