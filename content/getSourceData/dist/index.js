"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTeams_1 = require("./application/v1/usecases/players/getTeams");
async function run() {
    await (0, getTeams_1.getTeams)();
}
void run();
