export interface Match {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  matchId: string;
  matchType: string;
  players: string;
  isVictory: boolean;
}
