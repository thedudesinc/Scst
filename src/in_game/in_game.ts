import { AppWindow } from "../AppWindow";
import { OWGamesEvents, OWHotkeys } from "@overwolf/overwolf-api-ts";
import {
  interestingFeatures,
  hotkeys,
  windowNames,
  siegeClassId,
} from "../consts";
import WindowState = overwolf.windows.WindowStateEx;
import { SiegeEventHandler } from "../handlers/siege-event.handler";

// The window displayed in-game while a Siege game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _siegeGameEventsListener: OWGamesEvents;
  private _eventsLog: HTMLElement;
  private _infoLog: HTMLElement;
  private _siegeEventHandler: SiegeEventHandler;

  private constructor() {
    super(windowNames.inGame);

    this._eventsLog = document.getElementById("eventsLog");
    this._infoLog = document.getElementById("infoLog");
    this._siegeEventHandler = new SiegeEventHandler();

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();

    this._siegeGameEventsListener = new OWGamesEvents(
      {
        onInfoUpdates: this.onInfoUpdates.bind(this),
        onNewEvents: this.onNewEvents.bind(this),
      },
      interestingFeatures
    );
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public run() {
    this._siegeGameEventsListener.start();
  }

  private onInfoUpdates(info) {
    this._siegeEventHandler.onInfo(info);
    this.logLine(this._infoLog, info);
  }

  private onNewEvents(event) {
    this._siegeEventHandler.onEvents(event);
    this.logLine(this._eventsLog, event);
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const hotkeyText = await OWHotkeys.getHotkeyText(
      hotkeys.toggle,
      siegeClassId
    );
    const hotkeyElem = document.getElementById("hotkey");
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async (
      hotkeyResult: overwolf.settings.hotkeys.OnPressedEvent
    ): Promise<void> => {
      console.log(`pressed hotkey for ${hotkeyResult.name}`);
      const inGameState = await this.getWindowState();

      if (
        inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED
      ) {
        this.currWindow.minimize();
      } else if (
        inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED
      ) {
        this.currWindow.restore();
      }
    };

    OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  }

  // Appends a new line to the specified log
  private logLine(log: HTMLElement, data) {
    console.log(`${log.id}:`);
    console.log(data);
    const line = document.createElement("pre");
    line.textContent = JSON.stringify(data);

    const shouldAutoScroll =
      log.scrollTop + log.offsetHeight > log.scrollHeight - 10;

    log.appendChild(line);

    if (shouldAutoScroll) {
      log.scrollTop = log.scrollHeight;
    }
  }
}

InGame.instance().run();
