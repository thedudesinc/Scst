export interface Teamkill {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  matchId: number;
  offender: string;
  victim: string;
  offenderOperator: string;
  victimOperator: string;
  offenderKD: string;
  victimKD: string;
  round: number;
}
