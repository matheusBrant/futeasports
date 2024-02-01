"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const fs = require("fs");
const fs_1 = require("fs");
async function getTeams() {
    try {
        console.time('Execution time: ');
        const output = [];
        const positonDataSet = './src/application/v1/usecases/players/data/leaguesTeams.json';
        const data = await fs_1.promises.readFile(positonDataSet, 'utf8');
        const parsedData = JSON.parse(data);
        const teamsSetup = [];
        parsedData.forEach((league) => {
            const teamLeague = league.team.map((team) => ({
                idLeague: league.id,
                id: team.id,
                name: team.name,
                imageUrl: team.imageUrl
            }));
            teamsSetup.push(...teamLeague);
        });
        output.push(...teamsSetup);
        const outputFile = './src/application/v1/usecases/players/data/teams.json';
        const fileExists = fs.existsSync(outputFile);
        const fileStream = fs.createWriteStream(outputFile, { flags: fileExists ? 'a' : 'w' });
        fileStream.write(JSON.stringify(output));
        fileStream.end();
        console.timeEnd('Execution time: ');
    }
    catch (error) {
        console.log(error);
    }
}
exports.getTeams = getTeams;
