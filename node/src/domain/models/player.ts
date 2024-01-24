export interface player {
    "rank": number,
    "overallRating": number,
    "firstName": string,
    "lastName": string,
    "commonName": string,
    "birthdate": Date,
    "height": number,
    "skillMoves": number,
    "weakFootAbility": number,
    "attackingWorkRate": number,
    "defensiveWorkRate": number,
    "preferredFoot": number,
    "leagueName": string,
    "weight": number,
    "avatarUrl": string,
    "shieldUrl": string,
    "relationships"?: Record<string, any>
    "attributes"?: Record<string, any>
}