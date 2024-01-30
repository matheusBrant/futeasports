import { getPlayers } from './application/v1/usecases/players/getPlayer'

async function run (): Promise<void> {
  await getPlayers()
}

void run()
