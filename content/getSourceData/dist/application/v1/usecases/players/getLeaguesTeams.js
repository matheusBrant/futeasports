"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaguesTeams = void 0;
const api_1 = require("../../../../config/api");
const buildQueryString_1 = require("../../../../helpers/buildQueryString");
const fs = require("fs");
async function getLeaguesTeams() {
    try {
        console.time('Execution time: ');
        const output = [];
        const queryString = (0, buildQueryString_1.buildQueryString)({});
        const response = await fetch(`${api_1.filtersUrl}${queryString}`);
        const responseJson = await response.json();
        const leaguesSetup = responseJson.leagues
            .filter((leagues) => leagues.gender.id === 0) // men leagues
            .map((leagues) => {
            const teamLeague = leagues.teams.map((team) => ({
                id: team.id,
                name: team.label,
                imageUrl: team.imageUrl
            }));
            return {
                id: leagues.id,
                name: leagues.label,
                region_id: leagues.region.id,
                isPopular: leagues.isPopular,
                team: teamLeague
            };
        });
        output.push(...leaguesSetup);
        const outputFile = './src/application/v1/usecases/players/data/leaguesTeams.json';
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
exports.getLeaguesTeams = getLeaguesTeams;
