import type { App } from './App';

import { PasteHandler } from '@rnacanvas/paste-interface';

import { first } from '@rnacanvas/utilities';

/**
 * Handles drop events for a target RNAcanvas app instance.
 */
export class DropHandler {
  /**
   * Wrapped paste handler.
   */
  readonly #pasteHandler;

  constructor(targetApp: App) {
    this.#pasteHandler = new PasteHandler(targetApp);
  }

  async handle(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    let files = [...event.dataTransfer?.files ?? []];

    if (files.length == 0) {
      throw new Error('No files were dropped.');
    }

    let firstFile = first(files);

    if (files.length > 1) {
      console.warn('Multiple files were dropped. (Only the first file is processed.)');
    }

    return await this.#pasteHandler.handle({
      clipboardData: {
        getData: () => '',

        /**
         * Only input the first file
         * (to prevent console messages saying that multiple files were pasted).
         */
        files: [firstFile],
      },

      preventDefault: () => {},
      stopPropagation: () => {},
    });
  }
}
