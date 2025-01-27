import type { App } from './App';

/**
 * Opens dropped RNAcanvas files (with ".rnacanvas" extension) in the target app.
 */
export class RNAcanvasFileDropHandler {
  #targetApp;

  constructor(targetApp: App) {
    this.#targetApp = targetApp;
  }

  /**
   * Handles the provided drop event.
   *
   * Does nothing if an RNAcanvas file (with ".rnacanvas") was not dropped.
   */
  async handle(event: DragEvent) {
    let files = event.dataTransfer?.files ?? [];
    let filesArray = [...files];

    if (filesArray.length == 0) {
      return;
    }

    let firstFile = filesArray[0];

    if (!firstFile.name.toLowerCase().endsWith('.rnacanvas')) {
      return;
    }

    event.preventDefault();

    this.#targetApp.pushUndoStack();

    try {
      this.#targetApp.restore(JSON.parse(await firstFile.text()));

      // deselect any previously selected elements
      this.#targetApp.deselect();

      this.#targetApp.drawingView.fitToContent();
    } catch (error) {
      console.error(error);
      console.error('Unable to open saved drawing.');

      this.#targetApp.undo();
    }
  }
}
