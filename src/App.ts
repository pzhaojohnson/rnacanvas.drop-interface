/**
 * The app interface used by drop handler classes.
 */
export interface App {
  undo(): void;
  pushUndoStack(): void;

  /**
   * Restores the app to a previous state.
   *
   * Throws if unable to do so.
   */
  restore(previousState: unknown): void | never;
}
