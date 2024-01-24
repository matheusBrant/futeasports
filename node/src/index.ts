import { teste } from './application/v1/usecases/players/getPlayer';

async function run() {
  const greeting: string = 'Hello, TypeScript!';
  console.log(greeting);

  const result = await teste();
  console.log(result);
}

run();
