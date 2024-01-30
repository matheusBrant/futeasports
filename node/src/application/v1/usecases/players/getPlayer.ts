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
            name: `${player.firstName} ${player.lastName}`,
            birthdate: player.birthdate,
            height: player.height,
            overall: player.overallRating,
            rank: player.rank,
            positions: { id: player.position.id, label: player.position.label },
            nationality: { id: player.nationality.id, label: player.nationality.label },
            team: { id: player.team.id, label: player.team.label },
            shieldUrl: player.shieldUrl/* ,
            skillMoves: player.skillMoves,
            weakFootAbility: player.weakFootAbility,
            attackingWorkRate: player.attackingWorkRate,
            defensiveWorkRate: player.defensiveWorkRate,
            preferredFoot: player.preferredFoot,
            leagueName: player.leagueName,
            weight: player.weight,
            avatarUrl: player.avatarUrl,
            shieldUrl: player.shieldUrl */
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
