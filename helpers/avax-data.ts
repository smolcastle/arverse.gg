import { Data } from 'pages/api/avax'

const fs = require('fs')

let avaxData = require('data/avax.json')

export const avax = {
  data: () => avaxData,
  update
}

function update(data: Data) {
  avaxData = data
  avaxData.createdAt = new Date().toISOString()
  saveData()
}

function saveData() {
  fs.writeFile(
    'data/avax.json',
    JSON.stringify(avaxData, null, 2),
    (err: any) => {
      if (err) {
        console.log(err)
      }
    }
  )
}
