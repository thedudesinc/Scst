import { Match } from "../models/match";
import { Player } from "../models/player";
import { Score } from "../models/score";
import { MatchService } from "../services/match.service";
import { PlayerService } from "../services/player.service";
import { TeamkillService } from "../services/teamkill.service";

export class SiegeEventHandler {
  private matchService: MatchService;
  private teamkillService: TeamkillService;
  private playerService: PlayerService;

  private inProgress: Match = {
    gameMatchId: "",
    owMatchId: "",
    gameMode: "",
    map: "",
    blueScore: 0,
    orangeScore: 0,
    roundsPlayed: 0,
  };

  private players: Player[] = [];

  private roundPlayers: Player[] = [];

  constructor() {
    this.matchService = new MatchService();
    this.teamkillService = new TeamkillService();
    this.playerService = new PlayerService();
  }

  async onEvents(event) {
    switch (event.events[0].name) {
      case "matchOutcome":
        let match = await this.matchService.create(this.inProgress);

        for (let player of this.players) {
          player.matchId = match.id;
          await this.playerService.create(player);
        }

        this.inProgress = {
          gameMatchId: "",
          owMatchId: "",
          gameMode: "",
          map: "",
          blueScore: 0,
          orangeScore: 0,
          roundsPlayed: 0,
        };

        this.players = [];
        break;
      case "roundOutcome":
        for (let player of this.roundPlayers) {
          let index = this.players.findIndex((p) => p.name === player.name);

          if (index === -1) {
            this.players.push(player);
          } else {
            this.players[index].score += player.score;
            this.players[index].kills += player.kills;
            this.players[index].deaths += player.deaths;
            this.players[index].headshots += player.headshots;
          }
        }
        break;
      // case "kill":
      // case "roundEnd":
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
          let index = this.roundPlayers.findIndex(
            (p) => p.rosterPosition === keyNames[0]
          );

          let unmappedPlayer: any = JSON.parse(info.players[keyNames[0]]);

          if (!unmappedPlayer) break;

          let player: Player = {
            matchId: 0,
            deaths: unmappedPlayer.deaths ?? 0,
            defuser: unmappedPlayer.defuser ?? 0,
            headshots: unmappedPlayer.headshots ?? 0,
            kills: unmappedPlayer.kills ?? 0,
            name: unmappedPlayer.name ?? "",
            operator: unmappedPlayer.operator,
            rosterPosition: keyNames[0] ?? "",
            score: unmappedPlayer.score ?? 0,
            team: unmappedPlayer.team ?? "",
          };

          if (index !== -1) {
            this.roundPlayers[index] = player;
          } else {
            this.roundPlayers.push(player);
          }
        }
        break;
      default:
        break;
    }
  }
}
