/**
 * The drop event interface used by drop handlers.
 */
export interface DropEvent {
  readonly dataTransfer: {
    files: Iterable<File> | undefined;
  } | null;

  preventDefault(): void;
}
