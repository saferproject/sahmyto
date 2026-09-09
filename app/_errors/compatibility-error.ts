export default class CompatibilityError extends Error {
  readonly title: string;

  constructor(message: string, title = "این مرورگر پشتیبانی نمی‌شود") {
    super(message);
    this.name = "CompatibilityError";
    this.title = title;
  }
}
