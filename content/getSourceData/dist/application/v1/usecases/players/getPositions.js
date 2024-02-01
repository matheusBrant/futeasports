"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositions = void 0;
const api_1 = require("../../../../config/api");
const buildQueryString_1 = require("../../../../helpers/buildQueryString");
const fs = require("fs");
async function getPositions() {
    try {
        console.time('Execution time: ');
        const output = [];
        const queryString = (0, buildQueryString_1.buildQueryString)({});
        const response = await fetch(`${api_1.filtersUrl}${queryString}`);
        const responseJson = await response.json();
        const positionsSetup = responseJson.positions
            .filter((position) => position.id != null)
            .map((position) => {
            return {
                id: position.id,
                name: position.label,
                shortName: position.shortLabel
            };
        });
        output.push(...positionsSetup);
        const outputFile = './src/application/v1/usecases/players/data/positions.json';
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
exports.getPositions = getPositions;
