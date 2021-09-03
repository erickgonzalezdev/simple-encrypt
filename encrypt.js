const fs = require('fs')
const encrypt = require("./encryptLib").encrypt

//const fileName = 'toencrypt.txt'
const pass = process.env.PASS
const fileName =  process.env.FILE

const start = async  () => {
  try {
    if(!pass) throw new Error("PASS enviroment is required")
    if(!fileName) throw new Error("FILE path enviroment is required")

    const verifyPath = fs.existsSync(fileName)
    if (!verifyPath) throw new Error(`"${fileName}" en directorio raiz no encontrado`)
    const data = await read(fileName)
    const dataStr = data.toString()
    const encrypted =  await encrypt(dataStr, pass)
    console.log(encrypted)

  } catch (error) {
    console.log(error.message)
  }
}


const read = async (fileName) => {
  // console.log("fileName", fileName)
  return new Promise(function (resolve, reject) {
    try {
      if (!fileName || typeof fileName !== 'string') {
        throw new Error('fileName property must be a string')
      }

      fs.readFile(fileName, (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log(' not found!')
          } else {
            console.log(`err: ${JSON.stringify(err, null, 2)}`)
          }

          throw err
        }

        //const obj = JSON.parse(data)

        return resolve(data)
      })
    } catch (err) {
      console.error('Error trying to read JSON file in util.js/_readJSON().')
      return reject(err)
    }
  })
}
start()