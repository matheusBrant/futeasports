import { base_url } from "../../../../config/api"
import { buildQueryString } from "../../../../helpers/buildQueryString"
import fs = require('fs')

export async function teste() {
  try {
    console.time('Execution time: ')

    let output: object[] = []
    for (let index = 0; index < 174; index++) {
      const offset = index * 100

      const queryString = buildQueryString({ offset })
      const response = await fetch(`${base_url}${queryString}`)  
      const responseJson = await response.json()
  
      const playerSetup = responseJson.items
      .filter((player: Record<string, any>) => player.gender.id === 0)
      .map((player: Record<string, any>) => { 
        return { 
          name: `${player.firstName} ${player.lastName}`, 
          overall: player.overallRating, 
          rank: player.rank 
        }
      })
     
      output.push(...playerSetup)
    }
    const outputFile = '../players.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()
  
    console.timeEnd('Execution time: ')
  } catch (error) {
      console.log(error)
  }
  
}