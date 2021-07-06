export interface Match {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  gameMatchId: string;
  owMatchId: string;
  gameMode: string;
  map: string;
  blueScore: number;
  orangeScore: number;
  roundsPlayed: number;
}
