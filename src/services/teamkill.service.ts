import { apiUrl } from "../constants";
import { Teamkill } from "../models/teamkill";

export class TeamkillService {
  async findAll(): Promise<Teamkill[]> {
    const response = await fetch(`${apiUrl}/teamkills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Teamkill[] = await response.json();

    return result;
  }

  async find(id: number): Promise<Teamkill> {
    const response = await fetch(`${apiUrl}/teamkills/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Teamkill = await response.json();

    return result;
  }

  async create(teamkill: Teamkill): Promise<Teamkill> {
    const response = await fetch(`${apiUrl}/teamkills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(teamkill),
    });

    let result: Teamkill = await response.json();

    return result;
  }

  async update(teamkill: Teamkill): Promise<Teamkill> {
    const response = await fetch(`${apiUrl}/teamkills/${teamkill.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(teamkill),
    });

    let result: Teamkill = await response.json();

    return result;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${apiUrl}/teamkills/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });
  }
}
