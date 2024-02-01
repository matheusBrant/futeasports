import { getTeams } from './application/v1/usecases/players/getTeams'

async function run (): Promise<void> {
  await getTeams()
}

void run()
