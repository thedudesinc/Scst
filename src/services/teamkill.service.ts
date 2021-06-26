import * as rc from "typed-rest-client/RestClient";
import { apiUrl } from "../constants";
import { Teamkill } from "../models/teamkill";

export class TeamkillService {
  private rest: rc.RestClient;

  constructor() {
    this.rest = new rc.RestClient("", `${apiUrl}/teamkills`);
  }

  async findAll(): Promise<Teamkill[]> {
    let response = await this.rest.get<Teamkill[]>("");
    return response.result;
  }

  async find(id: number): Promise<Teamkill> {
    let response = await this.rest.get<Teamkill>(`/${id}`);
    return response.result;
  }

  async create(teamkill: Teamkill): Promise<Teamkill> {
    let response = await this.rest.create<Teamkill>("", teamkill);
    return response.result;
  }

  async update(teamkill: Teamkill): Promise<Teamkill> {
    let response = await this.rest.update<Teamkill>(
      `/${teamkill.id}`,
      teamkill
    );
    return response.result;
  }

  async delete(id: number): Promise<void> {
    await this.rest.del(`/${id}`);
  }
}
