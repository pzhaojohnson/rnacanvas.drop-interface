/**
 * The drop event interface used by drop handlers.
 */
export interface DropEvent {
  readonly dataTransfer: {
    files: FileList | undefined;
  } | null;

  preventDefault(): void;
}
