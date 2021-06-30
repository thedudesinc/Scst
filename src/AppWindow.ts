import { OWWindow } from "@overwolf/overwolf-api-ts";
import { TeamkillService } from "./services/teamkill.service";

// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
  protected currWindow: OWWindow;
  protected mainWindow: OWWindow;
  protected maximized: boolean = false;
  private teamkillService: TeamkillService;

  constructor(windowName) {
    this.mainWindow = new OWWindow("background");
    this.currWindow = new OWWindow(windowName);

    const closeButton = document.getElementById("closeButton");
    const maximizeButton = document.getElementById("maximizeButton");
    const minimizeButton = document.getElementById("minimizeButton");

    const header = document.getElementById("header");

    this.teamkillService = new TeamkillService();

    this.teamkillService.create({
      matchId: "1",
      matchType: "Testing",
      offender: "Nighthawk909",
      offenderKD: "1",
      offenderOperator: "sledge",
      victim: "mr.mustard",
      victimKD: "2",
      victimOperator: "IQ",
      round: 1,
    });

    this.setDrag(header);

    closeButton.addEventListener("click", () => {
      this.mainWindow.close();
    });

    minimizeButton.addEventListener("click", () => {
      this.currWindow.minimize();
    });

    maximizeButton.addEventListener("click", () => {
      if (!this.maximized) {
        this.currWindow.maximize();
      } else {
        this.currWindow.restore();
      }

      this.maximized = !this.maximized;
    });
  }

  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  private async setDrag(elem) {
    this.currWindow.dragMove(elem);
  }
}
