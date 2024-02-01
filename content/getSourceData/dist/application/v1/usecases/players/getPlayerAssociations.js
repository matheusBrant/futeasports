"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerAssociations = void 0;
const api_1 = require("../../../../config/api");
const buildQueryString_1 = require("../../../../helpers/buildQueryString");
const fs = require("fs");
async function getPlayerAssociations() {
    try {
        console.time('Execution time: ');
        const output = [];
        const dataBaseMaxSize = 17400;
        for (let index = 0; index < (dataBaseMaxSize / 100); index++) {
            const offset = index * 100;
            const queryString = (0, buildQueryString_1.buildQueryString)({ offset });
            const response = await fetch(`${api_1.baseUrl}${queryString}`);
            const responseJson = await response.json();
            const playerSetup = responseJson.items
                .filter((player) => player.gender.id === 0)
                .map((player) => {
                return {
                    player_id: player.id,
                    leagueName: player.leagueName,
                    team_id: player.team.id,
                    position_id: player.position.id
                };
            });
            output.push(...playerSetup);
        }
        const outputFile = './src/application/v1/usecases/players/data/playerAssociations.json';
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
exports.getPlayerAssociations = getPlayerAssociations;
