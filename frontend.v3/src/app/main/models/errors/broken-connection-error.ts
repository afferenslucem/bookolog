export class BrokenConnectionError extends Error {
  public constructor() {
    super('Could not send request');
  }
}
