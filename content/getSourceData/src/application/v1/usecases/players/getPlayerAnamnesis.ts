import { baseUrl } from '../../../../config/api'
import { buildQueryString } from '../../../../helpers/buildQueryString'
import fs = require('fs')

export async function getPlayers (): Promise<void> {
  try {
    console.time('Execution time: ')

    const output: object[] = []
    const dataBaseMaxSize = 17400
    for (let index = 0; index < (dataBaseMaxSize / 100); index++) {
      const offset = index * 100

      const queryString = buildQueryString({ offset })
      const response = await fetch(`${baseUrl}${queryString}`)
      const responseJson = await response.json()

      const playerSetup: Array<Record<string, any>> = responseJson.items
        .filter((player: Record<string, any>) => player.gender.id === 0)
        .map((player: Record<string, any>) => {
          return {
            id: player.id,
            rank: player.rank,
            name: `${player.firstName} ${player.lastName}`,
            commonName: player.commonName,
            birthdate: player.birthdate,
            height: player.height,
            weight: player.weight,
            avatarUrl: player.avatarUrl,
            shieldUrl: player.shieldUrl,
            nationality_id: player.nationality.id
          }
        })

      output.push(...playerSetup)
    }
    const outputFile = './src/application/v1/usecases/players/data/players.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
