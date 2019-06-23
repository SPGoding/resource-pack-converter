const fs = require('fs-extra')
const path = require('path')

const arr = fs.readJsonSync(path.join(__dirname, './input/sorter.json'))

fs.writeFileSync(path.join(__dirname, './output/sorter.json'), JSON.stringify(arr.sort(), undefined, 4))