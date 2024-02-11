"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNationalities = void 0;
const api_1 = require("../../../../config/api");
const buildQueryString_1 = require("../../../../helpers/buildQueryString");
const fs = require("fs");
async function getNationalities() {
    try {
        console.time('Execution time: ');
        const output = [];
        const queryString = (0, buildQueryString_1.buildQueryString)({});
        const response = await fetch(`${api_1.filtersUrl}${queryString}`);
        const responseJson = await response.json();
        const nationalitySetup = responseJson.nationality
            .filter((nationality) => nationality.id != null)
            .map((nationality) => {
            return {
                id: nationality.id,
                name: nationality.label,
                imageUrl: nationality.imageUrl,
                isPopular: nationality.isPopular
            };
        });
        output.push(...nationalitySetup);
        const outputFile = './src/application/v1/usecases/players/data/nationalities.json';
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
exports.getNationalities = getNationalities;
