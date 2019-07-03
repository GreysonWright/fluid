export class FluidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FluidError';
  }
}
