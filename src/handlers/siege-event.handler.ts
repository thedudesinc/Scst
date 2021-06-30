import { MatchService } from "../services/match.service";
import { TeamkillService } from "../services/teamkill.service";

export class SiegeEventHandler {
  private matchService: MatchService;
  private teamkillService: TeamkillService;

  constructor() {
    console.log("made it to constructor");
    this.matchService = new MatchService();
    this.teamkillService = new TeamkillService();
  }

  private matchId = "";

  onEvents(event) {
    console.log(event);
    switch (event.events[0].name) {
      case "kill":
        this.onKill(event);
        break;
      case "matchOutcome":
      case "roundEnd":
      case "roundOutcome":
      case "roundStart":
      case "headshot":
      case "death":
        this.onKill(event);
        break;
      case "killer":
      case "knockedout":
      case "defuser_disabled":
      case "defuser_planted":
      default:
        break;
    }
  }

  onInfo(info) {
    switch (info.name) {
      case "match_id":
        this.matchId = info.match_info.match_id;
        console.log(info);
        break;
      case "phase":
      case "number":
      case "deaths":
      case "health":
      case "kills":
      case "roster":
      case "score":
      case "team":
      case "game_mode":
      case "map_id":
      case "pseudo_match_id":
      case "round_outcome_type":
      case "account_id":
      case "name":
      default:
        break;
    }
  }

  onKill(event): void {
    console.log(event);
    this.teamkillService.create({
      matchId: this.matchId,
      matchType: "Testing",
      offender: "Nighthawk909",
      offenderKD: "1",
      offenderOperator: "sledge",
      victim: "mr.mustard",
      victimKD: "2",
      victimOperator: "IQ",
      round: 1,
    });
  }
}
