export interface Teamkill {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  matchId: string;
  matchType: string;
  offender: string;
  victim: string;
  offenderOperator: string;
  victimOperator: string;
  offenderKD: string;
  victimKD: string;
  round: number;
}
