import { filtersUrl } from '../../../../config/api'
import { buildQueryString } from '../../../../helpers/buildQueryString'
import fs = require('fs')

export async function getNationalities (): Promise<void> {
  try {
    console.time('Execution time: ')

    const output: object[] = []

    const queryString = buildQueryString({})
    const response = await fetch(`${filtersUrl}${queryString}`)
    const responseJson = await response.json()

    const leagueSetup: Array<Record<string, any>> = responseJson.league
      .filter((league: Record<string, any>) => league.id != null)
      .map((league: Record<string, any>) => {
        return {
          id: league.id,
          name: league.label,
          imageUrl: league.imageUrl,
          isPopular: league.isPopular
        }
      })

    output.push(...leagueSetup)

    const outputFile = './src/application/v1/usecases/players/data/leagues.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
