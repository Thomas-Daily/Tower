export class Ticket {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
    this.id = data.id
    this.isAttending = data.isAttending
  }
}