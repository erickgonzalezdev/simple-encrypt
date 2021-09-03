const decrypt = require("./encryptLib").decrypt

//const fileName = 'toencrypt.txt'
const pass = process.env.PASS
const encryptData =  process.env.DATA

const start = async  () => {
  try {
    if(!pass) throw new Error("PASS enviroment is required")
    if(!encryptData) throw new Error("DATA enviroment is required")

    const decrypted =  await decrypt(encryptData, pass)
    console.log(decrypted)

  } catch (error) {
    console.log(error.message)
  }
}
start()