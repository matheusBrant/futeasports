export interface Player {
    id: string
    idApi: number
    rank: number
    name: string
    commonName: string
    birthdate: string
    height: number
    weight: number
    avatarUrl: string
    shieldUrl: string
    createdAt: Date
    updatedAt: Date
    idNationality: number
    0: { shieldUrl: string }
  }