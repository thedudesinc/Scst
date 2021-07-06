export interface Player {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  matchId: number;
  rosterPosition: string;
  name: string;
  team: string;
  operator: number;
  kills: number;
  headshots: number;
  deaths: number;
  score: number;
  defuser: number;
}
