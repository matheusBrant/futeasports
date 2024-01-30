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

    const nationalitySetup: Array<Record<string, any>> = responseJson.nationality
      .filter((nationality: Record<string, any>) => nationality.id != null)
      .map((nationality: Record<string, any>) => {
        return {
          id: nationality.id,
          name: nationality.label,
          imageUrl: nationality.imageUrl,
          isPopular: nationality.isPopular
        }
      })

    output.push(...nationalitySetup)

    const outputFile = './src/application/v1/usecases/players/data/nationalities.json'
    const fileExists = fs.existsSync(outputFile)
    const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' })
    fileStream.write(JSON.stringify(output))
    fileStream.end()

    console.timeEnd('Execution time: ')
  } catch (error) {
    console.log(error)
  }
}
