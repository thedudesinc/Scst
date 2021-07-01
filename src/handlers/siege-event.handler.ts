import { Match } from "../models/match";
import { Roster } from "../models/roster";
import { Score } from "../models/score";
import { MatchService } from "../services/match.service";
import { TeamkillService } from "../services/teamkill.service";

export class SiegeEventHandler {
  private matchService: MatchService;
  private teamkillService: TeamkillService;

  private inProgress: Match = {
    gameMatchId: "",
    owMatchId: "",
    gameMode: "",
    map: "",
    blueScore: 0,
    orangeScore: 0,
    players: "",
    roundsPlayed: 0,
  };

  private playerList: { key: string; value: Roster }[] = [];

  constructor() {
    this.matchService = new MatchService();
    this.teamkillService = new TeamkillService();
  }

  onEvents(event) {
    switch (event.events[0].name) {
      case "matchOutcome":
        this.inProgress.players = this.playerList
          .map((p) => p.value.name)
          .join(",");

        this.matchService
          .create(this.inProgress)
          .then(() => console.log("Match created!"));

        this.inProgress = {
          gameMatchId: "",
          owMatchId: "",
          gameMode: "",
          map: "",
          blueScore: 0,
          orangeScore: 0,
          players: "",
          roundsPlayed: 0,
        };
        break;
      // case "kill":
      // case "roundEnd":
      // case "roundOutcome":
      // case "roundStart":
      // case "headshot":
      // case "death":
      // case "killer":
      // case "knockedout":
      // case "defuser_disabled":
      // case "defuser_planted":
      default:
        break;
    }
  }

  onInfo(info) {
    let eventType = Object.keys(info);
    if (!eventType) return;

    switch (eventType[0]) {
      case "match_info":
        if (info.match_info.pseudo_match_id) {
          this.inProgress.owMatchId = info.match_info.pseudo_match_id;
          console.log("set ow match id: " + this.inProgress.owMatchId);
        }

        if (info.match_info.match_id) {
          this.inProgress.gameMatchId = info.match_info.match_id;
          console.log("set game match id: " + this.inProgress.gameMatchId);
        }

        if (info.match_info.map_id) {
          this.inProgress.map = info.match_info.map_id;
          console.log("set map: " + this.inProgress.map);
        }

        if (info.match_info.game_mode && info.match_info.game_mode != "NONE") {
          this.inProgress.gameMode = info.match_info.game_mode;
          console.log("set game mode: " + this.inProgress.gameMode);
        }
        break;
      case "match":
        if (info.match.score) {
          let score: Score = JSON.parse(info.match.score);
          this.inProgress.blueScore = parseInt(score.blue);
          this.inProgress.orangeScore = parseInt(score.orange);
          console.log("set blue score: " + this.inProgress.blueScore);
          console.log("set orange score: " + this.inProgress.orangeScore);
        }
        break;
      case "round":
        if (info.round && info.round.number) {
          this.inProgress.roundsPlayed = parseInt(info.round.number);
          console.log("set current round: " + this.inProgress.roundsPlayed);
        }
        break;
      case "players":
        let keyNames = Object.keys(info.players);

        if (keyNames && keyNames.length > 0) {
          let index = this.playerList.findIndex((p) => p.key === keyNames[0]);

          let roster: Roster = JSON.parse(info.players[keyNames[0]]);

          if (index !== -1) {
            if (roster)
              this.playerList[index] = {
                key: keyNames[0],
                value: roster,
              };
          } else {
            if (roster) {
              this.playerList.push({
                key: keyNames[0],
                value: roster,
              });
            }
          }
        }
        break;
      default:
        break;
    }
  }
}
