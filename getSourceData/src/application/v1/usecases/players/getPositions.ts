import { filtersUrl } from '../../../../config/api'
import { buildQueryString } from '../../../../helpers/buildQueryString'
import fs = require('fs')

export async function getPositions (): Promise<void> {
  try {
    console.time('Execution time: ')

    const output: object[] = []

    const queryString = buildQueryString({})
    const response = await fetch(`${filtersUrl}${queryString}`)
    const responseJson = await response.json()

    const positionsSetup: Array<Record<string, any>> = responseJson.positions
      .filter((position: Record<string, any>) => position.id != null)
      .map((position: Record<string, any>) => {
        return {
          id: position.id,
          name: position.label,
          shortName: position.shortLabel
        }
      })

    output.push(...positionsSetup)

    const outputFile = './src/application/v1/usecases/players/data/positions.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
