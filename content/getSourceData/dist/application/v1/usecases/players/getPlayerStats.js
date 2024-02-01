"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerStats = void 0;
const api_1 = require("../../../../config/api");
const buildQueryString_1 = require("../../../../helpers/buildQueryString");
const fs = require("fs");
async function getPlayerStats() {
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
                .filter((player) => player.gender.id === 0 && player.position.id !== 0) // mans not gk
                .map((player) => {
                return {
                    player_id: player.id,
                    overallRating: player.overallRating,
                    skillMoves: player.skillMoves,
                    weakFootAbility: player.weakFootAbility,
                    attackingWorkRate: player.attackingWorkRate,
                    defensiveWorkRate: player.defensiveWorkRate,
                    preferredFoot: player.preferredFoot,
                    pace: player.stats.pac.value,
                    shooting: player.stats.sho.value,
                    passing: player.stats.pas.value,
                    dribbling: player.stats.dri.value,
                    defending: player.stats.def.value,
                    physicality: player.stats.phy.value
                };
            });
            output.push(...playerSetup);
        }
        const outputFile = './src/application/v1/usecases/players/data/playerStats.json';
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
exports.getPlayerStats = getPlayerStats;
