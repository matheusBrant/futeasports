import { filtersUrl } from '../../../../config/api'
import { buildQueryString } from '../../../../helpers/buildQueryString'
import fs = require('fs')

export async function getLeaguesTeams (): Promise<void> {
  try {
    console.time('Execution time: ')

    const output: object[] = []

    const queryString = buildQueryString({})
    const response = await fetch(`${filtersUrl}${queryString}`)
    const responseJson = await response.json()

    const leaguesSetup: Array<Record<string, any>> = responseJson.leagues
      .filter((leagues: Record<string, any>) => leagues.gender.id === 0) // men leagues
      .map((leagues: Record<string, any>) => {
        const teamLeague = leagues.teams.map((team: Record<string, any>) => ({
          id: team.id,
          name: team.label,
          imageUrl: team.imageUrl
        }))

        return {
          id: leagues.id,
          name: leagues.label,
          region_id: leagues.region.id,
          isPopular: leagues.isPopular,
          team: teamLeague
        }
      })

    output.push(...leaguesSetup)

    const outputFile = './src/application/v1/usecases/players/data/leaguesTeams.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
