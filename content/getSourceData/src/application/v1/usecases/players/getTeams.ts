import fs = require('fs')
import { promises as fsPromises } from 'fs'

export async function getTeams (): Promise<void> {
  try {
    console.time('Execution time: ')

    const output: object[] = []

    const positonDataSet = './src/application/v1/usecases/players/data/leaguesTeams.json'
    const data = await fsPromises.readFile(positonDataSet, 'utf8')
    const parsedData = JSON.parse(data)

    const teamsSetup: Array<Record<string, any>> = []

    parsedData.forEach((league: Record<string, any>) => {
      const teamLeague: Array<Record<string, any>> =
      league.team.map((team: Record<string, any>) => ({
        idLeague: league.id,
        id: team.id,
        name: team.name,
        imageUrl: team.imageUrl
      }))

      teamsSetup.push(...teamLeague)
    })

    output.push(...teamsSetup)

    const outputFile = './src/application/v1/usecases/players/data/teams.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
