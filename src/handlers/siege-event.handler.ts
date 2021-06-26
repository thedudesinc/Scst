
export class SiegeEventHandler {
    private matchId = "";

    onEvents(event) {
        switch (event.name) {
            case "matchOutcome":
            case "roundEnd":
            case "roundOutcome":
            case "roundStart":
            case "headshot":
            case "kill":
            case "death":
            case "killer":
            case "knockedout":
            case "defuser_disabled":
            case "defuser_planted":
            default: 
                break;
        }
        console.log(event);
    }

    onInfo(info) {
        switch (info.name) {
            case "match_id":
                this.matchId = info.match_info.match_id;
                break;
            case "phase":
            case "number":
            case "score":
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
        console.log(info);
    }
}