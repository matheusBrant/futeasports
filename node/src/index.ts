import { getLeaguesTeams } from './application/v1/usecases/players/getLeaguesTeams'

async function run (): Promise<void> {
  await getLeaguesTeams()
}

void run()
