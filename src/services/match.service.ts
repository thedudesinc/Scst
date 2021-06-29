import { apiUrl } from "../constants";
import { Match } from "../models/match";

export class MatchService {
  async findAll(): Promise<Match[]> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/matches`,
        overwolf.web.enums.HttpRequestMethods.GET,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Match[] = JSON.parse(response.data);

    return result;
  }

  async find(id: number): Promise<Match> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/matches/${id}`,
        overwolf.web.enums.HttpRequestMethods.GET,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Match = JSON.parse(response.data);

    return result;
  }

  async create(match: Match): Promise<Match> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/matches`,
        overwolf.web.enums.HttpRequestMethods.POST,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Match = JSON.parse(response.data);

    return result;
  }

  async update(match: Match): Promise<Match> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/matches/${match.id}`,
        overwolf.web.enums.HttpRequestMethods.PUT,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Match = JSON.parse(response.data);

    return result;
  }

  async delete(id: number): Promise<void> {
    await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/matches/${id}`,
        overwolf.web.enums.HttpRequestMethods.DELETE,
        [],
        "",
        (response) => resolve(response)
      );
    });
  }
}
