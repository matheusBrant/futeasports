import { baseUrl } from '../../../../config/api'
import { buildQueryString } from '../../../../helpers/buildQueryString'
import fs = require('fs')

export async function getPlayerAssociations (): Promise<void> {
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
            player_id: player.id,
            leagueName: player.leagueName,
            team_id: player.team.id,
            position_id: player.position.id
          }
        })

      output.push(...playerSetup)
    }
    const outputFile = './src/application/v1/usecases/players/data/playerAssociations.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
