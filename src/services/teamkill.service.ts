import { apiUrl } from "../constants";
import { Teamkill } from "../models/teamkill";

export class TeamkillService {
  async findAll(): Promise<Teamkill[]> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/teamkills`,
        overwolf.web.enums.HttpRequestMethods.GET,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Teamkill[] = JSON.parse(response.data);

    return result;
  }

  async find(id: number): Promise<Teamkill> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/teamkills/${id}`,
        overwolf.web.enums.HttpRequestMethods.GET,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Teamkill = JSON.parse(response.data);

    return result;
  }

  async create(teamkill: Teamkill): Promise<Teamkill> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/teamkills`,
        overwolf.web.enums.HttpRequestMethods.POST,
        [{ key: "Content-Type", value: "application/json" }],
        JSON.stringify(teamkill),
        (response) => resolve(response)
      );
    });

    let result: Teamkill = JSON.parse(response.data);

    return result;
  }

  async update(teamkill: Teamkill): Promise<Teamkill> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/teamkills/${teamkill.id}`,
        overwolf.web.enums.HttpRequestMethods.PUT,
        [],
        "",
        (response) => resolve(response)
      );
    });

    let result: Teamkill = JSON.parse(response.data);

    return result;
  }

  async delete(id: number): Promise<void> {
    let response: any = await new Promise((resolve) => {
      overwolf.web.sendHttpRequest(
        `${apiUrl}/teamkills/${id}`,
        overwolf.web.enums.HttpRequestMethods.DELETE,
        [],
        "",
        (response) => resolve(response)
      );
    });
  }
}
