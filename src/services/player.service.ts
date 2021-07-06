import { apiUrl } from "../constants";
import { Player } from "../models/player";

export class PlayerService {
  async findAll(): Promise<Player[]> {
    const response = await fetch(`${apiUrl}/players`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Player[] = await response.json();

    return result;
  }

  async find(id: number): Promise<Player> {
    const response = await fetch(`${apiUrl}/players/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });

    let result: Player = await response.json();

    return result;
  }

  async create(player: Player): Promise<Player> {
    const response = await fetch(`${apiUrl}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(player),
    });

    let result: Player = await response.json();

    return result;
  }

  async update(player: Player): Promise<Player> {
    const response = await fetch(`${apiUrl}/players/${player.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(player),
    });

    let result: Player = await response.json();

    return result;
  }

  async delete(id: number): Promise<void> {
    await fetch(`${apiUrl}/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: "",
    });
  }
}
