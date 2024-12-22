import type { App } from './App';

import { RNAcanvasFileDropHandler } from './RNAcanvasFileDropHandler';

/**
 * Handles drop events for a target RNAcanvas app.
 */
export class DropHandler {
  #rnaCanvasFileDropHandler;

  constructor(targetApp: App) {
    this.#rnaCanvasFileDropHandler = new RNAcanvasFileDropHandler(targetApp);
  }

  /**
   * Handles the provided drop event.
   */
  async handle(event: DragEvent) {
    await this.#rnaCanvasFileDropHandler.handle(event);
  }
}
