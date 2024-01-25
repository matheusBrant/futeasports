import { getNationalities } from './application/v1/usecases/players/getNationalities'

async function run (): Promise<void> {
  await getNationalities()
}

void run()
