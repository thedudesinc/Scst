import { apiUrl } from "../constants";
import { Match } from "../models/match";

export class MatchService {
  async findAll(): Promise<Match[]> {
    const response = await fetch(`${apiUrl}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Match[] = await response.json();

    return result;
  }

  async find(id: number): Promise<Match> {
    const response = await fetch(`${apiUrl}/matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Match = await response.json();

    return result;
  }

  async create(match: Match): Promise<Match> {
    const response = await fetch(`${apiUrl}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(match),
    });

    let result: Match = await response.json();

    return result;
  }

  async update(match: Match): Promise<Match> {
    const response = await fetch(`${apiUrl}/matches/${match.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(match),
    });

    let result: Match = await response.json();

    return result;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${apiUrl}/matches/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });
  }
}
