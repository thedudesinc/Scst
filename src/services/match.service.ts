import * as rc from "typed-rest-client/RestClient";
import { apiUrl } from "../constants";
import { Match } from "../models/match";

export class MatchService {
  private rest: rc.RestClient;

  constructor() {
    this.rest = new rc.RestClient("", `${apiUrl}/matches`);
  }

  async findAll(): Promise<Match[]> {
    let response = await this.rest.get<Match[]>("");
    return response.result;
  }

  async find(id: number): Promise<Match> {
    let response = await this.rest.get<Match>(`/${id}`);
    return response.result;
  }

  async create(match: Match): Promise<Match> {
    let response = await this.rest.create<Match>("", match);
    return response.result;
  }

  async update(match: Match): Promise<Match> {
    let response = await this.rest.update<Match>(`/${match.id}`, match);
    return response.result;
  }

  async delete(id: number): Promise<void> {
    await this.rest.del(`/${id}`);
  }
}
