export default class IDGenerator {
  constructor() {
    this.id = 0
  }

  generateID() {
    return this.id++
  }
}
