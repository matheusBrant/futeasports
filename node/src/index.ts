import { getPositions } from './application/v1/usecases/players/getPositions'

async function run (): Promise<void> {
  await getPositions()
}

void run()
