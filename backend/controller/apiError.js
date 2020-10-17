export default class apiError {
  constructor(message = "", status = 400) {
    this.message = message;
    this.status = status;
  }
}
